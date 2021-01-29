import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_LIKES':{
      const id = action.data.id
      const blogToAdd = state.find(n => n.id === id)
      const changedblog = { 
        ...blogToAdd, 
        likes: blogToAdd.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedblog
      )
    }
    case 'DELETE_BLOG':{
      const id = action.data.id
      return state.filter(blog => blog.id !== id)
    }
    case 'ADD_COMMENT':
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
    data: blogs,
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const AddLikes = (blog) => {
  return async dispatch => {
    const id = blog.id
    dispatch({
      type: 'ADD_LIKES',
      data: { id },
    })
    await blogService.addLikes({
      ...blog,
      likes: blog.likes + 1,
    })
  }
}


export const DeleteBlog = (blog) => {
  return async dispatch => {
    const id = blog.id
    dispatch({
      type: 'DELETE_BLOG',
      data: { id },
    })
    await blogService.deleteBlog(id)
  }
}

export const addComment = (id, comment ) => {
  return async dispatch => {
    const commentedBlog = await blogService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: commentedBlog,
    })
  }
}

export default reducer