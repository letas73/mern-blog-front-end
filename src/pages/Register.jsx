import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { registerUser, selectAuth } from '../store/slices/auth'

const Register = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectAuth)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    dispatch(registerUser({ username, password }))
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40'>
      <h1 className='text-lg text-white text-center'>
        Регистрация
      </h1>
      <label className='text-xs text-gray-400'>
        Username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}  
          type="text"
          placeholder='Username'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>
      <label className='text-xs text-gray-400'>
        Password:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}  
          type="password"
          placeholder='Password'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button onClick={handleSubmit} type='submit' className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
          Зарегистрироваться
        </button>
        <Link to='/login' className='flex justify-center items-center text-xs text-white'>
          Есть аккаунт?
        </Link>
      </div> 
    </form>
  )
}

export default Register