// Slide 9: Auth middleware extracted from server.js into its own file.
// Checks the x-api-key header and either calls next() or rejects with 401.
function auth(req, res, next) {
  const apiKey = req.headers["x-api-key"]
  if (apiKey === "12345") {
    next()
  } else {
    res.status(401).json({ data: null, error: "Unauthorized" })
  }
}

module.exports = auth
