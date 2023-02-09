import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/server'

export const createComment = createAsyncThunk('comment/createComment', async ({postId, comment}) => {
  try {
    const { data } = await axios.post(`/comments/${postId}`, { postId, comment })

    return data
  } catch (e) {
    console.log(e);
  }
})

export const getComments = createAsyncThunk('comment/getComments', async (postId) => {
  try {
    const { data } = await axios.get(`posts/comments/${postId}`)

    return data
  } catch (e) {
    console.log(e);
  }
})

const initialState = {
  comments: [],
  isLoading: false
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // create comments
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false
      state.comments.push(action.payload)
    })
    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false
    })
    
    // get comments
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.isLoading = false
      state.comments = action.payload
    })
    builder.addCase(getComments.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { } = commentSlice.actions

export default commentSlice.reducer