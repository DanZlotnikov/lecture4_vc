// Slide 5: Route file — only maps URLs to controller functions
const express = require("express")
const router = express.Router()
const jokeController = require("../controllers/jokeController")

router.get("/", jokeController.getJoke)

module.exports = router
