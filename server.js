// Lecture 4 — combined server wiring together all concepts from the slides:
//
//  Separation of concerns (slide 7)
//    controllers/  ← business logic
//    routes/       ← URL mapping
//    middleware/   ← auth, validation, error handling
//
//  Routes available:
//    GET  /jokes                        → random joke (slide 5)
//    GET  /dashboard  (x-api-key: 12345) → protected route (slide 9)
//    GET  /users?age=20&page=1&limit=2  → filtering + pagination (slide 17)
//    GET  /users/:id                    → single user, 404 if missing (slide 15)
//    POST /users  { name, age }         → validated create (slide 12)

const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

// ── Routes ────────────────────────────────────────────────────────────────────
const jokeRoutes     = require("./routes/jokes")
const dashboardRoutes = require("./routes/dashboard")
const userRoutes     = require("./routes/users")

app.use("/jokes",     jokeRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/users",     userRoutes)

// ── Centralized error handler (slide 14-15, must be last) ────────────────────
function errorHandler(err, req, res, next) {
  console.error(err.message)
  if (err.message === "User not found") {
    return res.status(404).json({ data: null, error: err.message })
  }
  res.status(500).json({ data: null, error: "Internal Server Error" })
}
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Lecture 4 server running on http://localhost:${PORT}`)
  console.log("")
  console.log("Available endpoints:")
  console.log("  GET  /jokes")
  console.log("  GET  /dashboard           (requires header x-api-key: 12345)")
  console.log("  GET  /users               (supports ?age=&page=&limit=)")
  console.log("  GET  /users/:id")
  console.log("  POST /users               body: { name: string, age?: number }")
})
