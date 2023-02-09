import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from '../utils/server'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import Moment from 'react-moment'
import { removePost } from '../store/slices/posts'
import { toast } from 'react-toastify'
import { createComment, getComments } from '../store/slices/comment'
import CommentItem from '../components/CommentItem'

const Post = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  
  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setData(res.data)
    }).catch((e) => {
      console.log(e);
      alert(e.message)
    }).finally(() => {
      setLoading(false)
    })
    dispatch(getComments(id))
  }, [id, dispatch])

  const removePostHandle = () => {
    dispatch(removePost(id))
    toast('Пост был удален')
    navigate('/')
  }

  const handleSubmit = () => {
    const postId = id
    dispatch(createComment({ postId, comment}))
  }

  if (loading) {
    return (
      <h1 className='text-xl text-white text-center py-10'>Загрузка...</h1>
    )
  }

  return (
    <div>
      <button
        className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
      <div className='flex gap-10 py-8'>
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className={data?.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
              {
                data?.imgUrl && (
                  <img src={`http://localhost:5000/${data.imgUrl}`} alt="" className='object-cover w-full' />
                )
              }
            </div>
          </div>
          <div className='flex justify-between items-center pt-2'>
            <div className='text-xs text-white opacity-50'>
              {data.username}
            </div>
            <div className='text-xs text-white opacity-50'>
              <Moment date={data.createdAt} format='D MMM YYYY' />
            </div>
          </div>
          <div className='text-white text-center'>
            {data.title}
          </div>
          <p className='text-white opacity-50 text-xs pt-4'>
            {data.text}
          </p>
          <div className='flex gap-3 items-center mt-2 justify-between'>
            <div className='flex gap-3 mt-4'>
              <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiFillEye /> <span>{data.views}</span>
              </button>
              <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiOutlineMessage /> <span>{data.comments?.length}</span>
              </button>
            </div>
            {
              user?._id === data.author && (
                <div className='flex gap-3 mt-4'>
                  <button onClick={() => navigate(`/${id}/edit`)} className='flex items-center justify-center gap-2 text-white opacity-50'>
                    <AiTwotoneEdit />
                  </button>
                  <button onClick={removePostHandle} className='flex items-center justify-center gap-2 text-white opacity-50'>
                    <AiFillDelete />
                  </button>
                </div>
              )
            }
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className='flex gap-2' onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder='comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='text-black w-full rounded-sm bg-ray-400 border p-2 text-xs outline-none placeholder:text-gray-800'
            />
            <button
              type='submit'
              className='flex justify-center items-center bg-gray-600 rounded-sm py-2 px-4 text-white'
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </form>

          {
            comments.length ? comments.map((comment) => (
              <CommentItem key={comment._id} {...comment} />
            )) : (
              <div className='text-white text-lg'>Нет комментариев</div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Post