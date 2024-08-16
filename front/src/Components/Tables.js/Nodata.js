import React from 'react'
import { TbFileSearch } from "react-icons/tb";
import { Link } from 'react-router-dom';

export const NodataFor = ({text}) => {
  return (
    <div className='mx-auto py-20 w-full justify-center flex flex-col text-center'>
        <TbFileSearch size={100} className=' mx-auto opacity-80' />
        <p className='font-medium mt-4 text-lg'> {text} </p>
        <div className=' space-x-4 mx-auto mt-10 flex items-stretch'>
            <Link to={'select_fournisseurs'} className='bg-orange-500 hover:bg-orange-600 text-white transition-all py-2 px-5 rounded-sm font-medium'> 
                Select Fournisseurs 
            </Link>
        </div>
    </div>
  )
}

export const Nodata = ({text}) => {
  return (
    <div className='mx-auto py-20 w-full justify-center flex flex-col text-center'>
        <TbFileSearch size={100} className=' mx-auto opacity-80' />
        <p className='font-medium mt-4 text-lg'> {text} </p>
    </div>
  )
}