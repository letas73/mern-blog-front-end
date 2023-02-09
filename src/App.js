import React, { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { authMe } from './store/slices/auth'
import Main from './pages/Main'
import Posts from './pages/Posts'
import Post from './pages/Post'
import EditPost from './pages/EditPost'
import AddPost from './pages/AddPost'
import Register from './pages/Register'
import Login from './pages/Login'
import Layout from './components/Layout'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/:id' element={<Post />} />
        <Route path='/new' element={<AddPost />} />
        <Route path='/:id/edit' element={<EditPost />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      
      <ToastContainer position='bottom-right' />
    </Layout>
  );
}

export default App;