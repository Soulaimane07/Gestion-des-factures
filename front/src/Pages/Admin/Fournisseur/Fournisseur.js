import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { DocumentTitle, GetData, GetDataa } from '../../../Components/Functions';
import Navbar from '../../../Components/Navbar';
import { openRemove } from '../../../Components/Redux/Slices/RemoveSlice';
import { useDispatch } from 'react-redux';
import { SecondCLientsTable } from '../../../Components/Tables.js/Clients';
import Footer from '../../../Components/Footer/Footer';

function Fournisseur() {
    const {fournisseurid} = useParams()
    const dispatch = useDispatch()
    useEffect(()=> {
        window.scrollTo(0, 0)
    }, [])

    DocumentTitle(`Fizazi & Associes | Fournisseur`)
    const fournisseur = GetDataa(`/fournisseurs/${fournisseurid}`)
    const clients = GetData(`/fournisseurs/${fournisseurid}/clients`)

  return (
    <>
        <Navbar />

        <div className='min-h-screen px-20 py-16 bg-gray-50 text-gray-700'>
            <div className='flex items-center justify-between'>
            <h1 className='text-3xl w-full font-medium'>  
                {fournisseur?.name} <i className='text-lg'> ( {fournisseur?._id} )</i> 
            </h1>
                <div className='flex items-center space-x-2'>
                    <Link to={"update"} className='bg-orange-500 px-6 py-2 hover:bg-orange-600 transition-all text-md text-white'>Update</Link>
                    <button onClick={()=> dispatch(openRemove({id: fournisseurid, type: "fournisseur"}))} className='bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 transition-all text-md'>Delete</button>
                </div>
            </div>
            
            <div className=' bg-white mt-10 shadow-md '>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6'>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2 opacity-60'> Account ID </label>
                        <p> {fournisseur?._id} </p>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2 opacity-60'> Nom Complet </label>
                        <p> {fournisseur?.name} </p>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2 opacity-60'> Raison social </label>
                        <p> {fournisseur?.raisonsocial} </p>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2 opacity-60'> IF <i className='text-sm mb-2 opacity-80'> | Description sur IF </i>  </label>
                        <p> {fournisseur?.if} </p>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2 opacity-60'> ICE <i className='text-sm mb-2 opacity-80'> | Description sur ICE </i> </label>
                        <p> {fournisseur?.ice} </p>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2 opacity-60'> Type activité </label>
                        <p> {fournisseur?.activite} </p>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2 opacity-60'> Code tiers </label>
                        <p> {fournisseur?.code}  </p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto mt-8 shadow-md">
                <h2 className='text-lg font-medium bg-gray-100 bg-opacity-80 py-6 px-6'> Clients ( {clients?.length ?? 0} ) </h2>
                {clients?.length !== 0 &&
                    <SecondCLientsTable clients={clients} />
                }
            </div>
        </div>

        <Footer />
    </>
  )
}

export default Fournisseur