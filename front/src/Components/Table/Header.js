import React from 'react'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'

function Header({header, button, link, search}) {
  return (
    <div className='flex items-center justify-between'>
        <h1 className='text-3xl w-full font-medium'> {header?.title} ({header?.length}) </h1>
        
        <div className='flex w-full justify-end space-x-4 items-stretch'>
            <SearchBox search={search} />
            <Link to={link} className='bg-yellow-400 px-6 py-2 font-medium rounded-sm hover:bg-yellow-500 transition-all'> {button} </Link>
        </div>
    </div>
  )
}

export default Header