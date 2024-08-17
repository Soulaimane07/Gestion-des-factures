import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { Link, useParams } from 'react-router-dom'
import { DocumentTitle } from '../../../Components/Functions'
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClient } from '../../../Components/Redux/Slices/ClientSlice'
import { openRemove } from '../../../Components/Redux/Slices/RemoveSlice'
import { FournisseurTable } from '../../../Components/Tables.js/Tables'
import { GreenBadget, RedBadget } from '../../../Components/Badges'
import Footer from '../../../Components/Footer/Footer'


function Client() {
    const {clientid} = useParams()
    DocumentTitle(`Amazon | Client - ${clientid}`)
    useEffect(()=> {
        window.scrollTo(0, 0)
    }, [])

    const dispatch= useDispatch()

    useEffect(()=> {
        dispatch(fetchClient(clientid))
    }, [clientid])

    const client = useSelector(state => state.clients.client)
    
    

    const [open, setOpen] = useState(false)


  return (
    <>
        <Navbar />

        <div className='min-h-screen px-20 py-16 bg-gray-50 text-gray-700'>
            <h1 className='text-3xl w-full font-medium'>  {client?.name} <i className='text-lg'> ( {client?._id} )</i> </h1>
            
            <div className=' bg-white mt-10 shadow-md '>
                <h2 className=' flex items-center justify-between font-medium mb-2 bg-gray-100 bg-opacity-80 py-6 px-6'> 
                    <p className='text-lg'>Details </p>
                    <div className='flex items-center space-x-2 text-white'>
                        <Link to={"update"} className='bg-orange-500 px-6 py-2 hover:bg-orange-600 transition-all text-md'>Update</Link>
                        <button onClick={()=> dispatch(openRemove({id: clientid, type: "client"}))} className='bg-orange-500 px-6 py-2 hover:bg-orange-600 transition-all text-md'>Delete</button>
                    </div>
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6'>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> Account ID </label>
                            <p> {client?._id} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> Nom Complet </label>
                            <p> {client?.name} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> Raison social </label>
                            <p> {client?.raisonsocial} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> IF <i className='text-sm mb-2 opacity-80'> | Description sur IF </i>  </label>
                            <p> {client?.if} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> ICE <i className='text-sm mb-2 opacity-80'> | Description sur ICE </i> </label>
                            <p> {client?.ice} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> Nature du Client </label>
                            <p> {client?.natureclient} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> Exoneration </label>
                            <p>
                                {client?.exoneration 
                                    ?   <GreenBadget text="Inclus" /> 
                                    :   <RedBadget text="Exclus" />  
                                }
                            </p>
                        </div>
                </div>
            </div>

            <div className=' bg-white mt-10 shadow-md '>
                <button onClick={()=> setOpen(!open)} className='w-full font-medium mb-2 bg-gray-100 bg-opacity-80 py-6 px-6 flex items-center'> 
                    {open ? <GoTriangleDown size={30} /> : <GoTriangleRight size={30} /> }
                    <p className='text-lg'> Fournisseurs ( {client?.fournisseurs?.length} ) </p>
                </button>
                
                {open &&
                    <div className='px-8'>
                        <FournisseurTable fournisseurs={client?.fournisseurs} client={true} />
                    </div>
                }

                {/* {!client?.fournisseur && open && <CreateFournisseur client={client} setOpen={setOpen} />} */}
            </div>
        </div>

        <Footer />
    </>
  )
}

export default Client