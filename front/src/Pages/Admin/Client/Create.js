import React, { useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { GiAnticlockwiseRotation } from "react-icons/gi";
import axios from "axios"
import { ServerUrl } from '../../../Components/Variables';
import Spinner from '../../../Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFournisseurs } from '../../../Components/Redux/Slices/FournisseurSlice';
import { fetchClients } from '../../../Components/Redux/Slices/ClientSlice';
import { DocumentTitle } from '../../../Components/Functions';

function Create() {
    DocumentTitle("Amazon | Creer Client")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = useState(false)
    
    
    const [name, setName] = useState("")
    const [raisonsocial, setRaison] = useState("")
    const [iff, setIf] = useState(null)
    const [ice, setIce] = useState(null)
    const [natureclient, setNature] = useState("")
    const [exoneration, setExoneration] = useState(null)
    const [fournisseur, setFournisseur] = useState(null)

    const CreateFun = () => {
        setScroll(true)

        axios.post(`${ServerUrl}/clients`, {name, raisonsocial, if: iff, ice, natureclient, exoneration, fournisseur})
        .then((res)=> {
            setScroll(false)
            navigate('/clients')
            dispatch(fetchClients())
        })
        .catch(err => {
            console.error(err);
            setScroll(false)
        })
    }

    const fournisseurs = useSelector(state => state.fournisseurs.data)

    const cond = name?.length === 0 || raisonsocial?.length === 0 || iff?.length <= 0 || ice?.length <= 0 || natureclient?.length === 0 || exoneration === null

  return (
    <>
        <Navbar />

        <div className='min-h-screen px-10 md:px-20 py-16 bg-gray-50'>
            <h1 className='text-3xl w-full font-medium'> Create Client </h1>

            <div className=' bg-white mt-10 shadow-md '>
                <h2 className='text-lg font-medium mb-2 bg-gray-100 bg-opacity-80 py-6 px-6'> General configuration </h2>

                <div className='py-6 px-6'>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Nom Complet </label>
                        <input onChange={(e)=> setName(e.target.value)} type='text' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Raison social </label>
                        <input onChange={(e)=> setRaison(e.target.value)} type='text' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-1'> IF   </label>
                        <i className='text-sm mb-2'> Description sur IF </i>
                        <input onChange={(e)=> setIf(e.target.value)} type='number' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-1'> ICE </label>
                        <i className='text-sm mb-2'> Description sur ICE </i>
                        <input onChange={(e)=> setIce(e.target.value)} type='text' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Nature du Client </label>
                        <select onChange={(e)=> setNature(e.target.value)} className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4'>
                            <option value={""}> Select nature de client </option>
                            <option value={"etat"}>Etat</option>
                            <option value={"collective"}>Collectivite territorieles</option>
                        </select>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Exoneration </label>
                        <div className='flex items-stretch space-x-2 mb-1'>
                            <input onChange={(e)=> setExoneration(e.target.value)} value={0} name='h' id='exclus' type='radio' />
                            <label htmlFor='exclus'>Exclus</label>
                        </div>
                        <div className='flex items-stretch space-x-2'>
                            <input onChange={(e)=> setExoneration(e.target.value)} value={1} name='h' id='inclus' type='radio' />
                            <label htmlFor='inclus'>Inlus</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' bg-white mt-10 shadow-md'>
                <button onClick={()=> setOpen(!open)} className='text-lg w-full font-medium mb-2 bg-gray-100 bg-opacity-80 py-6 px-6 flex items-center'>
                    {open ? <GoTriangleDown size={30} /> : <GoTriangleRight size={30} />  }
                    Fournisseur 
                </button>

                {open && 
                    <div className='py-6 px-6'>
                        <div className='flex flex-col mb-6'>
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
                        </div>
                    </div>
                }
            </div>

            <div className='flex items-center space-x-4 mt-10 justify-end'>
                <Link to={'/clients'} className='bg-transparent font-medium transition-all hover:bg-white px-6 py-2'> Cancel </Link>
                <button 
                    disabled={cond}
                    onClick={CreateFun} 
                    className={`${cond ? 'opacity-40' : ' opacity-100 hover:bg-yellow-500'} bg-yellow-400 transition-all px-4 w-40 flex justify-center items-center py-2 font-medium`}
                > 
                    {scroll ? <Spinner /> : "Create Client " }
                </button>
            </div>
        </div>
    </>
  )
}

export default Create