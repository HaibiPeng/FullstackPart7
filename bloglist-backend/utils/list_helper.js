const lodash = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }
  ]

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let total = blogs.reduce(function(sum, blog) {
    return sum + blog.likes
    }, 0)
    return total;
}

const favoriteBlog = (blogs) => {
    let likes = blogs.map(blog => blog.likes)
    let mostliked = likes.indexOf(Math.max(...likes))
    //console.log(mostliked)
    return blogs[mostliked];
}

const mostBlogs = (blogs) => {
    const blogsofauthors = lodash.map(lodash.groupBy(blogs, 'author'), function(number, name) {
        let authorinfo = 
        { 
            'author': name,
            'blogs': number.length
        }
        return authorinfo
      })
      let blgs = blogsofauthors.map(blogsofauthor => blogsofauthor.blogs)
      let mostblgs = blgs.indexOf(Math.max(...blgs))
      return blogsofauthors[mostblgs]
}

const mostLikes = (blogs) => {
    const authors = lodash.groupBy(blogs, 'author')
   
    const authorTotalikes = lodash.map(authors, function(number, name) {
      let Totalikes =  lodash.sumBy(number, 'likes')
      let authorinfo = 
      { 
          'author': name,
          'likes': Totalikes
      }
      return authorinfo
    })
      let likes = authorTotalikes.map(authorTotalike => authorTotalike.likes)
      let mostlikes = likes.indexOf(Math.max(...likes))
      return authorTotalikes[mostlikes]
  }

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
module.exports = {
    initialBlogs,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    blogsInDb,
    usersInDb
}