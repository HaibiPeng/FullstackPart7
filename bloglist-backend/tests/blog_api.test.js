const mongoose = require('mongoose')
const supertest = require('supertest')
const listHelper = require("../utils/list_helper")
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

//jest.useFakeTimers()

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = listHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('blogs are obtained correctly', () => {
    test('blogs are retured as JSON', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    
    test('response has the correct number of blogs', async () => {
        const data = await api.get('/api/blogs')
        expect(data.body.length).toBe(listHelper.initialBlogs.length)
    })
    
    test('the only identifier property is the blog id', async () => {
        const data = await api.get('/api/blogs')
        expect(data.body[0].id).toBeDefined()
    })
})

describe('posting a new blog correctly', () => {
    test('a valid blog can be added', async () => {
      const newlogin = {
        username: "haibi",
        password: "peng",
      };

        const newBlog = {
          title: 'async/await simplifies making async calls',
          author: "Haibi Peng",
          url: "http://www.helloasync.com",
          likes: 10
        }
    
        const login = await api
          .post("/api/login")
          .send(newlogin)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        await api
          .post('/api/blogs')
          .set('Authorization', `bearer ${login.body.token}`)
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await listHelper.blogsInDb()
        expect(blogsAtEnd.length).toBe(listHelper.initialBlogs.length + 1)
    
        const contents = blogsAtEnd.map(blogs => blogs.title)
        expect(contents).toContain(newBlog.title)
      })
    
      test('the likes property equals to 0 by defualt if it is not provided', async () => {
        const newBlog = {
            title: 'No likes property',
            author: "Haibi Peng",
            url: "http://www.helloasync.com"
          }
    
        const addedBlog = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(200)
    
        expect(addedBlog.body.likes).toBe(0)
      })
    
      test('400 Bad Request is responded when title and url properties are not provided', async () => {
        const newBlog = {
          author: "Haibi Peng"
        }
    
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      })

      test('token not provided result in 401', async () => {
        const newBlog = {
          title: 'async/await simplifies making async calls',
          author: "Haibi Peng",
          url: "http://www.helloasync.com",
          likes: 10
        }
    
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/)
      })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await listHelper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await listHelper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        listHelper.initialBlogs.length - 1
      )
  
      const titles = blogsAtEnd.map(blog => blog.title)
  
      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('update a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await listHelper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedblog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: 100
      }
  
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedblog)
        .expect(200)
  
      const blogsAtEnd = await listHelper.blogsInDb()
  
      const likes = blogsAtEnd[0].likes
      expect(likes).toBe(100)
    })
  })

afterAll(() => {
    mongoose.connection.close()
})

