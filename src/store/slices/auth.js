import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/server'

export const registerUser = createAsyncThunk('auth/registerUser', async ({username, password}) => {
  try {
    const { data } = await axios.post('/auth/register', { username, password })

    if (data.token) {
      window.localStorage.setItem('token', data.token)
    }
    
    return data

  } catch (e) {
    console.log(e);
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
  try {
    const { data } = await axios.post('/auth/login', { username, password })

    if (data.token) {
      window.localStorage.setItem('token', data.token)
    }

    return data

  } catch (e) {
    console.log(e);
  }
})

export const authMe = createAsyncThunk('auth/authMe', async () => {
  try {
    const { data } = await axios.get('/auth/me')

    return data

  } catch (e) {
    console.log(e);
  }
})

const initialState = {
  user: null,
  isLoading: false,
  status: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload.newUser
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.user = null
      state.isLoading = false
      state.status = action.payload.message
    })

    // login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload.user
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null
      state.isLoading = false
      state.status = action.payload.message
    })

    // auth me
    builder.addCase(authMe.pending, (state) => {
      state.user = null
      state.isLoading = true
    })
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload.user
    })
    builder.addCase(authMe.rejected, (state, action) => {
      state.user = null
      state.isLoading = false
      state.status = action.payload.message
    })
  }
})
 
export const selectAuth = state => state.auth.user

export const { logout } = authSlice.actions

export default authSlice.reducer