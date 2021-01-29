const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getUserCred = async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  return user
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get("/:id", async(request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post("/", async(request, response, next) => {
  const body = request.body

  const user = await getUserCred(request, response)

  //console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: {
      _id: user._id,
      username: user.username,
      name: user.name
    },
    comments: body.comments
  })

  if (blog.title === undefined && blog.url == undefined) {
    response.status(400).json({ 'error:': 'Blog title and url properties are not defined' })
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(200).json(savedBlog.toJSON())
  }
})

blogsRouter.delete("/:id", async(request, response, next) => {
  const user = await getUserCred(request, response)

  console.log(user)

  const blog = await Blog.findById(request.params.id)

  console.log(blog)

  if (!blog.user) {
    blog.remove()
    response.status(204).end()
  } else if (blog.user.toString() === user.id.toString()) {
    blog.remove()
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'user is not allowed to remove other users blogs' })
  }
})

blogsRouter.put("/:id", async(request, response, next) => {
  const body = request.body

  const blog = {
    user: body.user.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const content = request.body.content
  if (!content) {
    response.status(403).json({ error: 'comment content is required' })
  }
  const blog = await Blog.findById(request.params.id)

  blog.comments = blog.comments.concat([content])

  const commentedBlog = await blog.save()

  if (commentedBlog) {
    await commentedBlog.populate('user', { username: 1, name: 1 }).execPopulate()
    response.json(commentedBlog.toJSON())
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter