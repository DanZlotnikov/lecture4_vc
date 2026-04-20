// Slide 11-12: Validation in APIs
// Validation middleware sits between the route and the controller.
// It checks req.body / req.params / req.query and rejects bad input early,
// so the controller only ever sees clean data.
//
// Try it:
//   POST http://localhost:3003/users  body: { "name": "Dan", "age": 20 }  → 201
//   POST http://localhost:3003/users  body: { "age": 20 }                 → 400 Invalid name
//   POST http://localhost:3003/users  body: { "name": "Dan", "age": "x" } → 400 Invalid age

const express = require("express")
const app = express()
app.use(express.json())

// ── Validation middleware ─────────────────────────────────────────────────────
function validateCreateUser(req, res, next) {
  const { name, age } = req.body
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid name" })
  }
  if (age !== undefined && typeof age !== "number") {
    return res.status(400).json({ error: "Invalid age" })
  }
  next()
}

// ── Controller ────────────────────────────────────────────────────────────────
function createUser(req, res) {
  const { name, age } = req.body
  res.status(201).json({ data: { id: Date.now(), name, age }, error: null })
}

// ── Route (validation runs before the controller) ────────────────────────────
const router = express.Router()
router.post("/users", validateCreateUser, createUser)

app.use("/", router)

app.listen(3003, () => console.log("03_validation running on http://localhost:3003"))
