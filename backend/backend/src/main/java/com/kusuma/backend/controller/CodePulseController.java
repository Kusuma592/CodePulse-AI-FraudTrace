package com.kusuma.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5175" })
public class CodePulseController {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    private static final List<String> MODELS = List.of(
        "gemini-3.8-flash",
        "gemini-3.5-flash-lite"
    );

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeCode(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");
        String language = payload.getOrDefault("language", "Java");

        if (code == null || code.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Code snippet cannot be empty"));
        }

        String prompt = """
            Analyze this %s code. Return ONLY raw valid JSON (no markdown fences) with keys:
            {
              "timeComplexity": "e.g., O(n log n)",
              "spaceComplexity": "e.g., O(n)",
              "qualityScore": 85,
              "bugs": ["list of potential bugs or edge cases"],
              "optimizedCode": "refactored clean optimal code",
              "explanation": "brief explanation of improvements"
            }
            Code:
            %s
            """.formatted(language, code);

        return callGemini(prompt);
    }

    @PostMapping("/compare")
    public ResponseEntity<?> compareSnippets(@RequestBody Map<String, String> payload) {
        String codeA = payload.get("codeA");
        String codeB = payload.get("codeB");
        String language = payload.getOrDefault("language", "Java");

        if (codeA == null || codeB == null || codeA.isBlank() || codeB.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Both code snippets are required"));
        }

        String prompt = """
            Compare these two %s implementations. Return ONLY raw valid JSON (no markdown fences) with keys:
            {
              "snippetA": { "time": "O(...)", "space": "O(...)", "verdict": "short note" },
              "snippetB": { "time": "O(...)", "space": "O(...)", "verdict": "short note" },
              "winner": "Snippet A or Snippet B",
              "reason": "why one performs better at scale"
            }
            Snippet A:
            %s
            Snippet B:
            %s
            """.formatted(language, codeA, codeB);

        return callGemini(prompt);
    }

    private ResponseEntity<?> callGemini(String prompt) {
        Map<String, Object> body = Map.of(
            "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
        );

        String lastError = "Unknown error";

        for (String model : MODELS) {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey;

            for (int attempt = 1; attempt <= 2; attempt++) {
                try {
                    Map response = restClient.post()
                            .uri(url)
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(body)
                            .retrieve()
                            .body(Map.class);

                    if (response == null || response.get("candidates") == null) {
                        lastError = "Empty response from model " + model;
                        continue;
                    }

                    List candidates = (List) response.get("candidates");
                    Map firstCandidate = (Map) candidates.get(0);
                    Map content = (Map) firstCandidate.get("content");
                    List parts = (List) content.get("parts");
                    String text = (String) ((Map) parts.get(0)).get("text");

                    text = text.replaceAll("```json", "").replaceAll("```", "").trim();
                    return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(text);

                } catch (RestClientResponseException e) {
                    lastError = e.getStatusCode().value() + " " + e.getResponseBodyAsString();
                    if (e.getStatusCode().value() == 503 && attempt < 2) {
                        try {
                            Thread.sleep(1000L * attempt);
                        } catch (InterruptedException ie) {
                            Thread.currentThread().interrupt();
                            return ResponseEntity.internalServerError().body(Map.of("error", "Request interrupted"));
                        }
                    } else {
                        break;
                    }
                } catch (Exception e) {
                    lastError = e.getMessage();
                    break;
                }
            }
        }

        return ResponseEntity.internalServerError().body(Map.of("error", lastError));
    }
}