import React, { useState, useEffect } from 'react'
import axios from '../utils/server'
import PostItem from '../components/PostItem'

const Posts = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/posts/user/me').then((res) => {
      setData(res.data)
    }).catch((e) => {
      console.log(e);
      alert('Не удалось получить посты')
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <h1 className='text-xl text-white text-center py-10'>Загрузка...</h1>
    )
  }

  if (!data.length) {
    return (
      <h1 className='text-xl text-white text-center py-10'>Постов не существует</h1>
    )
  }

  return (
    <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
      {
        data.map((post) => (
          <PostItem key={post._id} {...post} />
        ))
      }
    </div>
  )
}

export default Posts