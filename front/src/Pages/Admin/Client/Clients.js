import React from 'react'
import Navbar from '../../../Components/Navbar'
import Header from '../../../Components/Table/Header'
import { Link } from 'react-router-dom'
import { GoDash } from "react-icons/go";
import { useSelector } from 'react-redux'
import { DocumentTitle } from '../../../Components/Functions';

function Clients() {
    DocumentTitle("Amazon | Clients")
    const clients = useSelector(state=> state.clients.data)

  return (
    <>
        <Navbar />

        <div className='min-h-screen px-20 py-16 bg-gray-50'>
            <Header header={{title:"Clients", length: clients?.length}} button="Create Client" link="create" search="Search for clients" />

            <div className="overflow-x-auto mt-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            <th scope="col" className="px-6 py-3">
                                Fournisseur
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
                                <td className="px-6 py-4">
                                    {item.fournisseur 
                                    ? <Link to={`/fournisseurs/${item.fournisseur}`} className='hover:text-yellow-400 transition-all underline text-blue-500'> {item.fournisseur} </Link>
                                    : <span className='justify-center flex'> <GoDash /> </span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Clients