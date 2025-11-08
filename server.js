require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// ENV
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const API_SECRET = process.env.API_SECRET;

// ✅ 10 allowed users — edit this part
const allowedUsers = {
  "namapallyrevanth@gmail.com": "pass1",
  "user2@example.com": "pass2",
  "user3@example.com": "pass3",
  "user4@example.com": "pass4",
  "user5@example.com": "pass5",
  "user6@example.com": "pass6",
  "user7@example.com": "pass7",
  "user8@example.com": "pass8",
  "user9@example.com": "pass9",
  "user10@example.com": "pass10"
};

// ✅ Load fixed 100 codes
const CODES = require("./codes.json");
console.log(`Loaded ${CODES.length} codes`);

const pending = new Map();

// ✅ LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!allowedUsers[email] || allowedUsers[email] !== password) {
    return res.status(401).json({ error: "Invalid login" });
  }

  const code = CODES[Math.floor(Math.random() * CODES.length)];
  pending.set(email, code);

  const sendBody = { secret: API_SECRET, email, code };
  const send = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendBody)
  });

  const result = await send.json();
  if (!result.ok) return res.status(500).json({ error: "OTP send failed" });

  console.log(`[OTP] Sent ${code} to ${email}`);
  res.json({ ok: true });
});

// ✅ VERIFY
app.post("/api/verify", (req, res) => {
  const { email, code } = req.body;
  if (pending.get(email) === code) {
    pending.delete(email);
    return res.json({ ok: true });
  }
  res.status(400).json({ error: "Invalid code" });
});

// ✅ Protected page
app.get("/protected", (req, res) => {
  res.sendFile(path.join(__dirname, "public/protected.html"));
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
