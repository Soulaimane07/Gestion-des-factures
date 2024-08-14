import React, { useState } from 'react'
import { fetchFournisseurs } from './Redux/Slices/FournisseurSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GiAnticlockwiseRotation } from 'react-icons/gi'
import { ServerUrl } from './Variables'
import { fetchClient, fetchClients } from './Redux/Slices/ClientSlice'
import axios from 'axios'
import Spinner from './Spinner'

function CreateFournisseur({client, setOpen}) {
    const dispatch = useDispatch()

    const [fournisseur, setFournisseur] = useState(null)
    const fournisseurs = useSelector(state => state.fournisseurs.data)

    const [scroll, setScroll] = useState(false)
    const cond = !fournisseur

    const CreateFun = () => {
        setScroll(true)

        axios.patch(`${ServerUrl}/clients/${client?._id}`, {name: client?.name, raisonsocial: client?.raisonsocial, if: client?.iff, ice: client?.ice, natureclient: client?.natureclient, exoneration: client?.exoneration ? 1 : 0, fournisseur})
            .then((res)=> {
                setScroll(false)
                dispatch(fetchClients())
                dispatch(fetchClient(client?._id))
            })
            .catch(err => {
                console.error(err);
                setScroll(false)
            })
    }

  return (
        <div className='flex flex-col mb-6 p-6'>
            <label className='mb-2'> Fournisseur </label>
            <div className='space-x-8 flex items-stretch'>
                <select onChange={(e)=> setFournisseur(e.target.value)} className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4'>
                    <option value={null}> Select fournisseur </option>
                    {fournisseurs?.map((item,key)=>(
                        <option value={item._id} key={key}> {item.name}  </option>
                    ))}
                </select>
                <div className='space-x-4 flex items-stretch'>
                    <button onClick={()=> dispatch(fetchFournisseurs())} className='bg-gray-200 px-4 opacity-80 rounded-sm'> <GiAnticlockwiseRotation size={20} /> </button>
                    <Link target='_blank' to="/fournisseurs/create" className='bg-yellow-400 hover:bg-yellow-500 transition-all py-2 px-5 rounded-sm font-medium'> Create Fournisseur </Link>
                </div>
            </div>

            <div className='flex items-center space-x-4 mt-10 justify-end'>
                <button onClick={()=> setOpen(false)} className='bg-transparent font-medium transition-all hover:bg-white px-6 py-2'> Cancel </button>
                <button 
                    disabled={cond}
                    onClick={CreateFun} 
                    className={`${cond ? 'opacity-40' : ' opacity-100 hover:bg-yellow-500'} bg-yellow-400 transition-all px-4 w-40 flex justify-center items-center py-2 font-medium`}
                > 
                    {scroll ? <Spinner /> : "Set Fournisseur" }
                </button>
            </div>
        </div>
  )
}

export default CreateFournisseur