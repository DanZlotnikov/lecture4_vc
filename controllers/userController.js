// Slide 12, 15, 17: User controller combining validation, error handling, and query params

const users = [
  { id: 1, name: "Dan",  age: 20 },
  { id: 2, name: "Maya", age: 25 },
  { id: 3, name: "Noa",  age: 20 },
  { id: 4, name: "Eli",  age: 30 },
  { id: 5, name: "Lior", age: 20 },
]

// GET /users?age=&page=&limit=  — filtering + pagination (slide 17)
function getUsers(req, res) {
  const { age, page = 1, limit = 10 } = req.query

  let filtered = users
  if (age) {
    filtered = filtered.filter((u) => u.age === Number(age))
  }

  const start = (Number(page) - 1) * Number(limit)
  const paginated = filtered.slice(start, start + Number(limit))

  res.json({
    data: { page: Number(page), limit: Number(limit), total: filtered.length, users: paginated },
    error: null,
  })
}

// GET /users/:id  — centralized error handling (slide 15)
async function getUser(req, res, next) {
  try {
    const user = users.find((u) => u.id === Number(req.params.id))
    if (!user) throw new Error("User not found")
    res.json({ data: user, error: null })
  } catch (err) {
    next(err)
  }
}

// POST /users  — called after validateCreateUser middleware (slide 12)
function createUser(req, res) {
  const { name, age } = req.body
  const newUser = { id: users.length + 1, name, age }
  users.push(newUser)
  res.status(201).json({ data: newUser, error: null })
}

module.exports = { getUsers, getUser, createUser }
