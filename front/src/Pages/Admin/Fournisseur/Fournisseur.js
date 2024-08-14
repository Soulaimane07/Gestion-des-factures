import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { DocumentTitle, GetData, GetDataa } from '../../../Components/Functions';
import Navbar from '../../../Components/Navbar';
import { openRemove } from '../../../Components/Redux/Slices/RemoveSlice';
import { useDispatch } from 'react-redux';

function Fournisseur() {
    const {fournisseurid} = useParams()
    const dispatch = useDispatch()

    DocumentTitle(`Amazon | Fournisseur - ${fournisseurid}`)
    const fournisseur = GetDataa(`/fournisseurs/${fournisseurid}`)
    const clients = GetData(`/fournisseurs/${fournisseurid}/clients`)

  return (
    <>
        <Navbar />

        <div className='min-h-screen px-20 py-16 bg-gray-50'>
            <div className='flex items-center justify-between'>
            <h1 className='text-3xl w-full font-medium'>  
                {fournisseur?.name} <i className='text-lg'> ( {fournisseur?._id} )</i> 
            </h1>
                <div className='flex items-center space-x-6'>
                    <Link to={"update"} className='bg-yellow-400 px-6 py-2 hover:bg-yellow-500 transition-all text-md'>Update</Link>
                    <button onClick={()=> dispatch(openRemove({id: fournisseurid, type: "fournisseur"}))} className='bg-yellow-400 px-6 py-2 hover:bg-yellow-500 transition-all text-md'>Delete</button>
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

            <div className="overflow-x-auto mt-8">
                <h2 className='text-lg font-medium bg-gray-100 bg-opacity-80 py-6 px-6'> Clients ( {clients?.length ?? 0} ) </h2>
                {clients?.length !== 0 &&
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 bg-opacity-80">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Client ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nom complet
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Raison Social
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    IF
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ICE
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nature Client
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Exoneration
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients?.map((item,key)=> (
                                <tr key={key} className="bg-white border-b text-gray-900  dark:border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                        <Link to={`/clients/${item._id}`} className='hover:text-yellow-400 transition-all underline text-blue-500'> {item._id} </Link>
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.raisonsocial}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.if}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.ice}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.natureclient}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.exoneration ? 'Inclus' : 'Exclus'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </>
  )
}

export default Fournisseur