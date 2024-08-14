import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
 
function SearchBox({search}) {
  return (
    <div className='flex items-center w-1/2  px-2 border-2 border-gray-400 rounded-sm'>
        <input placeholder={search} className=' bg-transparent w-full px-2 outline-none' />
        <IoSearchOutline  size={22} />
    </div>
  )
}

export default SearchBox