import React from 'react'
import Navbar from '../../../Components/Navbar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DocumentTitle } from '../../../Components/Functions'
import Footer from '../../../Components/Footer/Footer'

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
        
        <div className='min-h-screen px-20 py-16 bg-gray-50 text-gray-700'>
          <div className="grid gap-6 mb-8  md:mb-12 md:grid-cols-2">
              {cards?.map((item,key)=>(
              <div key={key} className="flex flex-col shadow-sm rounded-md p-8 bg-gray-700 border-gray-600">
                  <h2 className='text-xl font-semibold text-white'> {item.title} ({item.number ?? 0}) </h2> 
                  <Link to={item.link} className='text-white mt-4 hover:text-orange-500 transition-all'> Read more... </Link>  
              </div>
              ))}
          </div>
        </div>

        <Footer />
    </>
  )
}

export default Home