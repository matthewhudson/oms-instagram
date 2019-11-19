const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { getUserFeed } = require('./helpers')

app.use(bodyParser.json())

const { PORT = 8080 } = process.env

app.get('/', async (req, res) => {
  const { users = '' } = req.query
  const usernames = users.split(',')
  if (usernames.length === 0) {
    res.status(500).json({ message: 'No users' })
  }
  const results = usernames.map(async username => getUserFeed(username))
  const data = await Promise.all(results).then(completed => completed)

  res.json({ data })
})

app.get('/health', (req, res) => res.send('OK'))

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
