import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/auth'
import posts from './slices/posts'
import comment from './slices/comment'

export const store = configureStore({
  reducer: {
    auth,
    posts,
    comment
  },
})