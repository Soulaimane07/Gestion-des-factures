import React from 'react'
import Navbar from '../../../Components/Navbar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DocumentTitle } from '../../../Components/Functions'
import Footer from '../../../Components/Footer/Footer'

function Home() {
  DocumentTitle("Fizazi & Associes")

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
        
        <div className='min-h-screen px-20 py-16 bg-gray-50 text-gray-700'>
          <div className="grid gap-6 mb-8  md:mb-12 md:grid-cols-2">
              {cards?.map((item,key)=>(
              <Link to={item.link} key={key} className="flex flex-col hover:text-orange-500 shadow-md rounded-md p-8 bg-white text-gray-700 border-2 border-opacity-5 border-gray-600">
                  <h2 className='text-xl font-semibold  transition-all'> {item.title} ({item.number ?? 0}) </h2> 
                  <Link to={item.link} className=' mt-4 text-gray-700 hover:text-orange-500 transition-all'> Read more... </Link>  
              </Link>
              ))}
          </div>
        </div>

        <Footer />
    </>
  )
}

export default Home