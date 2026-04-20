// Slide 8-9: Case Study — Refactoring a Route
// BEFORE: all logic (auth + route handler) crammed into server.js  ← bad
// AFTER:  auth extracted to middleware/auth.js, route to routes/dashboard.js
//
// This file shows the AFTER (clean) version.
// Try it:
//   GET http://localhost:3002/dashboard              → 401 Unauthorized
//   GET http://localhost:3002/dashboard  x-api-key: 12345  → 200 Welcome

const express = require("express")
const app = express()
app.use(express.json())

// ── middleware/auth.js (inlined for the example) ──────────────────────────────
function auth(req, res, next) {
  const apiKey = req.headers["x-api-key"]
  if (apiKey === "12345") {
    next()
  } else {
    res.status(401).json({ error: "Unauthorized" })
  }
}

// ── routes/dashboard.js (inlined for the example) ────────────────────────────
const router = express.Router()
router.get("/", auth, (req, res) => {
  res.json({ message: "Welcome to dashboard" })
})

// ── server.js ─────────────────────────────────────────────────────────────────
app.use("/dashboard", router)

app.listen(3002, () => console.log("02_refactoring_route running on http://localhost:3002"))
