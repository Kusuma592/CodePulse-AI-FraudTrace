package com.kusuma.backend.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fraud")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5175" })
public class FraudController {

    private final List history = new ArrayList();

    @PostMapping("/check")
    public Map checkTransaction(@RequestBody Map tx) {
        double amount = Double.parseDouble(tx.getOrDefault("amount", 0).toString());
        String location = tx.getOrDefault("location", "").toString().trim();
        String deviceId = tx.getOrDefault("deviceId", "").toString().trim();

        int riskScore = 10;
        List reasons = new ArrayList();

        if (amount > 50000) {
            riskScore += 45;
            reasons.add("High transaction amount (> 50,000)");
        }
        if (!location.equalsIgnoreCase("India")) {
            riskScore += 30;
            reasons.add("Foreign location detected (" + location + ")");
        }
        if (deviceId.isBlank() || deviceId.toLowerCase().contains("unknown") || deviceId.toLowerCase().contains("new")) {
            riskScore += 20;
            reasons.add("Unrecognized or new device");
        }

        if (riskScore > 100) {
            riskScore = 100;
        }

        String status = riskScore >= 70 ? "FLAGGED" : (riskScore >= 40 ? "REVIEW" : "SAFE");

        Map record = new LinkedHashMap();
        record.put("amount", amount);
        record.put("location", location);
        record.put("deviceId", deviceId.isEmpty() ? "N/A" : deviceId);
        record.put("riskScore", riskScore);
        record.put("status", status);
        record.put("reasons", reasons);
        record.put("checkedAt", Instant.now().toString());

        history.add(0, record);
        if (history.size() > 10) {
            history.remove(history.size() - 1);
        }

        return record;
    }

    @GetMapping("/history")
    public List getHistory() {
        return history;
    }
}