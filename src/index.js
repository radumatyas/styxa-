import express from 'express'
import { createUser, createCikkek } from './db.js'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { userRouter } from './routes/user.js'
import { articleRouter } from './routes/article.js'

const server = express()

const port = 3001 // barmi 1000 - 8000

server.use(bodyParser.json())

server.use(morgan('dev'))

// TODO: /auth

server.use('/users', userRouter)

server.use('/articles', articleRouter)

server.patch('/orszag', (req, res) => {
  res.send('orszag world ez az elso projektem')
})

server.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} cimen`)
  createUser()
  createCikkek()
  // deleteUsers()
})
