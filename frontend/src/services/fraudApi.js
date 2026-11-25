const BASE_URL = "http://localhost:8080/api/fraud";

export async function checkTransaction(payload) {
  const res = await fetch(`${BASE_URL}/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export async function getFraudHistory() {
  const res = await fetch(`${BASE_URL}/history`);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}