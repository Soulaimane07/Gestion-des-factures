import React from 'react'
import { MdError } from "react-icons/md";

function Error({error}) {
  return (
    <div className={`${error ? "inline" : "hidden"} text-red-500 flex items-center justify-center space-x-2`}>
        <MdError size={20} />
        <p className='text-lg font-medium'> {error} </p>
    </div>
  )
}

export default Error