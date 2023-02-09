import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/server'

export const createPost = createAsyncThunk('posts/createPost', async (params) => {
  try {
    const { data } = await axios.post('/posts', params)
    
    return data
  } catch (e) {
    console.log(e);
  }
})

export const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost) => {
  try {
    const { data } = await axios.put(`/posts/${updatedPost._id}`, updatedPost)

    return data
  } catch (e) {
    console.log(e);
  }
})

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const { data } = await axios.get('/posts')

    return data
  } catch (e) {
    console.log(e);
  }
})

export const removePost = createAsyncThunk('posts/removePost', async (id) => {
  try {
    axios.delete(`/posts/${id}`)
  } catch (e) {
    console.log(e);
  }
})

const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
  status: null
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // create post
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false
      state.posts.push(action.payload)
    })
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
    })

    // get posts
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false
      state.posts = action.payload.posts
      state.popularPosts = action.payload.popularPosts
    })
    builder.addCase(getPosts.rejected, (state, action) => {
      state.posts = []
      state.isLoading = false
      state.status = action.payload.message
    })

    // remove post
    builder.addCase(removePost.pending, (state, action) => {
      state.isLoading = true
      state.status = null
    })
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.isLoading = false
      state.posts = state.posts.filter((item) => item._id !== action.meta.arg)
      console.log(action);
    })
    builder.addCase(removePost.rejected, (state, action) => {
      state.isLoading = false
    })

    // update post
    builder.addCase(updatePost.pending, (state, action) => {
      state.isLoading = true
      state.status = null
    })
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false
      const index = state.posts.findIndex((post) => post._id === action.payload)
      state.posts[index] = action.payload
    })
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { } = postsSlice.actions

export default postsSlice.reducer