// Slide 4-5: Controllers
// Controllers extract business logic out of route handlers.
// The route only maps the URL; the controller does the work.
//
// Project layout used here:
//   controllers/jokeController.js  <- business logic
//   routes/jokes.js                <- URL mapping
//   server.js (this file)          <- app entry point
//
// Try it:  GET http://localhost:3001/jokes

const express = require("express")
const app = express()

// ── controllers/jokeController.js (inlined for the example) ──────────────────
function getJoke(req, res) {
  const jokes = [
    { premise: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs." },
    { premise: "Why do Java programmers wear glasses?", punchline: "Because they can't C#." },
    { premise: "Why did the programmer go broke?", punchline: "Because he used up all his cache." },
    { premise: "What is the object-oriented way to become wealthy?", punchline: "Inheritance." },
  ]
  const index = Math.floor(Math.random() * jokes.length)
  res.json(jokes[index])
}

// ── routes/jokes.js (inlined for the example) ────────────────────────────────
const router = express.Router()
router.get("/", getJoke)

// ── server.js ────────────────────────────────────────────────────────────────
app.use("/jokes", router)

app.listen(3001, () => console.log("01_controllers running on http://localhost:3001"))
