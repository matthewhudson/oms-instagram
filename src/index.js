const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const { PORT = 8080 } = process.env

app.post('/', (req, res) => {
  const { name } = req.body
  res.json({ message: `Hello ${name}` })
})

app.get('/health', (req, res) => res.send('OK'))

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
