import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'

const PostItem = ({
  _id,
  username,
  createdAt,
  title,
  text,
  imgUrl,
  views,
  comments
}) => {
  return (
    <div className='flex flex-col basis-1/4 flex-grow'>
      <div className={imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
        {
          imgUrl && (
            <img src={`http://localhost:5000/${imgUrl}`} alt="" className='object-cover w-full' />
          )
        }
      </div>
      <div className='flex justify-between items-center pt-2'>
        <div className='text-xs text-white opacity-50'>
          {username}
        </div>
        <div className='text-xs text-white opacity-50'>
          <Moment date={createdAt} format='D MMM YYYY' />
        </div>
      </div>
      <Link to={`/${_id}`} className='text-white text-center hover:text-gray-400'>
        {title}
      </Link>
      <p className='text-white opacity-50 text-xs pt-4'>
        {text}
      </p>
      <div className='flex gap-3 items-center mt-2'>
        <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
          <AiFillEye /> <span>{views}</span>
        </button>
        <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
          <AiOutlineMessage /> <span>{comments.length}</span>
        </button>
      </div>
    </div>
  )
}

export default PostItem