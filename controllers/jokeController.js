// Slide 5: Joke controller — business logic lives here, not in the route file
function getJoke(req, res) {
  const jokes = [
    { premise: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs." },
    { premise: "Why do Java programmers wear glasses?", punchline: "Because they can't C#." },
    { premise: "Why did the programmer go broke?", punchline: "Because he used up all his cache." },
    { premise: "What is the object-oriented way to become wealthy?", punchline: "Inheritance." },
  ]
  const index = Math.floor(Math.random() * jokes.length)
  res.json({ data: jokes[index], error: null })
}

module.exports = { getJoke }
