// Slide 13-15: Consistent Response Structure + Centralized Error Handling
//
// Two ideas combined:
//   1. Every response uses the same shape: { data, error }
//   2. Controllers call next(err) instead of writing their own error responses.
//      A single error-handler middleware at the bottom deals with all errors.
//
// Try it:
//   GET http://localhost:3004/users/1   → 200  { data: { id: 1, name: "Dan" }, error: null }
//   GET http://localhost:3004/users/99  → 404  { data: null, error: "User not found" }
//   GET http://localhost:3004/users/0   → 500  { data: null, error: "Internal Server Error" }

const express = require("express")
const app = express()
app.use(express.json())

// ── Fake data store ───────────────────────────────────────────────────────────
const users = [
  { id: 1, name: "Dan" },
  { id: 2, name: "Maya" },
]

// ── Service layer (business logic) ───────────────────────────────────────────
function getUserById(id) {
  if (id === 0) throw new Error("Database connection failed")  // simulate crash
  const user = users.find((u) => u.id === id)
  if (!user) throw new Error("User not found")
  return user
}

// ── Controller ────────────────────────────────────────────────────────────────
async function getUser(req, res, next) {
  try {
    const user = getUserById(Number(req.params.id))
    res.json({ data: user, error: null })
  } catch (err) {
    next(err)  // hand off to the centralized error handler
  }
}

// ── Routes ────────────────────────────────────────────────────────────────────
const router = express.Router()
router.get("/users/:id", getUser)
app.use("/", router)

// ── Centralized error-handling middleware (4 params, must be last) ────────────
function errorHandler(err, req, res, next) {
  console.error(err.message)
  if (err.message === "User not found") {
    return res.status(404).json({ data: null, error: err.message })
  }
  res.status(500).json({ data: null, error: "Internal Server Error" })
}
app.use(errorHandler)

app.listen(3004, () => console.log("04_error_handling running on http://localhost:3004"))
