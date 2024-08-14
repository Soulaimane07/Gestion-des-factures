import React from 'react'
import Navbar from '../../../Components/Navbar'
import Header from '../../../Components/Table/Header'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DocumentTitle } from '../../../Components/Functions'

function Fournisseurs() {
    DocumentTitle("Amazon | Fournisseurs")

    const fournisseurs = useSelector(state=> state.fournisseurs.data)

  return (
    <>
        <Navbar />

        <div className='min-h-screen px-20 py-16 bg-gray-50'>
            <Header header={{title:"Fournisseurs", length: fournisseurs?.length}} button="Create fournisseur" link="create" search="Search for fournisseurs" />

            <div className="overflow-x-auto mt-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Fournisseur ID
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
                                Code tiers
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type activité
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseurs?.map((item,key)=> (
                            <tr key={key} className="bg-white border-b text-gray-900  dark:border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                    <Link to={`${item?._id}`} className='hover:text-yellow-400 transition-all underline text-blue-500'> {item._id} </Link>
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
                                    {item.code}
                                </td>
                                <td className="px-6 py-4">
                                    {item.activite}
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

export default Fournisseurs