const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  
    response.json(users.map(u => u.toJSON()))
  })

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const saltRounds = 10
    if (body.password.length === 0) {
      return response.status(400).json({
        error: 'User validation failed: password: password is required'
      })
    }
    if (body.password.length < 3) {
      return response.status(400).json({
        error: 'User validation failed: password: password is too short'
      })
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter