// Slide 9: Dashboard route — uses auth middleware before the handler
const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

router.get("/", auth, (req, res) => {
  res.json({ data: { message: "Welcome to dashboard" }, error: null })
})

module.exports = router
