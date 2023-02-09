import React from 'react'
import {Link} from 'react-router-dom'

const PopularPosts = ({_id, title}) => {
  return (
    <Link to={`/${_id}`} className='bg-gray-600 my-1 cursor-pointer'>
      <div className='flex text-xs p-2 text-gray-300 hover:bg-gray-600 hover:text-white'>
        {title}
      </div>
    </Link>
  )
}

export default PopularPosts