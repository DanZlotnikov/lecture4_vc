// Slide 16-17: Query Parameters — Filtering & Pagination
// req.query values are always strings, so numeric params need Number() conversion.
//
// Try it:
//   GET http://localhost:3005/users                        → all 5 users (page 1, limit 10)
//   GET http://localhost:3005/users?age=20                 → 3 users aged 20
//   GET http://localhost:3005/users?age=20&page=1&limit=2  → first 2 of those 3
//   GET http://localhost:3005/users?age=20&page=2&limit=2  → last 1 of those 3

const express = require("express")
const app = express()

// ── Controller ────────────────────────────────────────────────────────────────
function getUsers(req, res) {
  const { age, page = 1, limit = 10 } = req.query

  const allUsers = [
    { id: 1, name: "Dan",  age: 20 },
    { id: 2, name: "Maya", age: 25 },
    { id: 3, name: "Noa",  age: 20 },
    { id: 4, name: "Eli",  age: 30 },
    { id: 5, name: "Lior", age: 20 },
  ]

  // Filtering
  let filtered = allUsers
  if (age) {
    filtered = filtered.filter((user) => user.age === Number(age))
  }

  // Pagination
  const start = (Number(page) - 1) * Number(limit)
  const end = start + Number(limit)
  const paginated = filtered.slice(start, end)

  res.json({
    page: Number(page),
    limit: Number(limit),
    total: filtered.length,
    data: paginated,
  })
}

// ── Routes ────────────────────────────────────────────────────────────────────
const router = express.Router()
router.get("/users", getUsers)
app.use("/", router)

app.listen(3005, () => console.log("05_query_params running on http://localhost:3005"))
