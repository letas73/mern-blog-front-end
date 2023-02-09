import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopularPosts from '../components/PopularPosts'
import PostItem from '../components/PostItem'
import { getPosts } from '../store/slices/posts'

const Main = () => {
  const dispatch = useDispatch()
  const { posts, popularPosts, isLoading } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  if (isLoading) {
    return (
      <h1 className='text-xl text-white text-center py-10'>Загрузка...</h1>
    )
  }

  if (!posts.length) {
    return (
      <div className='text-xl text-center text-white py-10'>Нет Опубликованных постов</div>
    )
  }

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {
            posts.map((item) => (
              <PostItem key={item._id} {...item} />
            ))
          }
        </div>
        <div className="basis-1/5">
          <div className='text-xs uppercase text-white'>
            Популярные
          </div>
          {
            !popularPosts.length ? (
              <div className='text-gray-500 text-sm'>Нет популярных постов</div>
            ) : (
              popularPosts.map((item) => (
                <PopularPosts key={item._id} _id={item._id} title={item.title} />
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Main