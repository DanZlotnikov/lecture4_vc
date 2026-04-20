// Slide 12: Request validation middleware.
// Validates req.body before the request reaches the controller.
function validateCreateUser(req, res, next) {
  const { name, age } = req.body
  if (!name || typeof name !== "string") {
    return res.status(400).json({ data: null, error: "Invalid name" })
  }
  if (age !== undefined && typeof age !== "number") {
    return res.status(400).json({ data: null, error: "Invalid age" })
  }
  next()
}

module.exports = { validateCreateUser }
