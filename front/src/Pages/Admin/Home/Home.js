import React from 'react'
import Navbar from '../../../Components/Navbar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DocumentTitle } from '../../../Components/Functions'

function Home() {
  DocumentTitle("Amazon")

const cards = [
  {
    "title": "Clients",
    "number": useSelector(state=> state.clients.data)?.length,
    "link": "/clients"
  },
  {
    "title": "Fournisseurs",
    "number": useSelector(state=> state.fournisseurs.data)?.length,
    "link": "/fournisseurs"
  }
]

  return (
    <>
        <Navbar />
        <div className='min-h-screen px-20 py-16 bg-gray-50'>
            

<div className="grid gap-6 mb-8 border  md:mb-12 md:grid-cols-2">
    {cards?.map((item,key)=>(
    <div key={key} className="flex flex-col shadow-sm rounded-md p-8 bg-gray-800 border-gray-700">
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white'> {item.title} ({item.number ?? 0}) </h2> 
        <Link to={item.link} className='text-white mt-4 hover:text-yellow-500 transition-all'> Read more... </Link>  
    </div>
    ))}
</div>

        </div>
    </>
  )
}

export default Home