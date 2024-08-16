import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { ServerUrl } from '../../../Components/Variables';
import Spinner from '../../../Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClient, fetchClients } from '../../../Components/Redux/Slices/ClientSlice';
import { DocumentTitle } from '../../../Components/Functions';
import Footer from '../../../Components/Footer/Footer';

function Update() {
    DocumentTitle("Amazon | Creer Client")
    useEffect(()=> {
        window.scrollTo(0, 0)
    }, [])
    const {clientid} = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [scroll, setScroll] = useState(false)
    
    useEffect(()=> {
        dispatch(fetchClient(clientid))
    }, [clientid])
    
    let client = useSelector(state => state.clients.client)
    
    
    const [name, setName] = useState(client?.name)
    const [raisonsocial, setRaison] = useState(client?.raisonsocial)
    const [iff, setIf] = useState(client?.if)
    const [ice, setIce] = useState(client?.ice)
    const [natureclient, setNature] = useState(client?.natureclient)
    const [exoneration, setExoneration] = useState(null)

    const CreateFun = () => {
        setScroll(true)

        axios.patch(`${ServerUrl}/clients/${clientid}`, {name, raisonsocial, if: iff, ice, natureclient, exoneration, fournisseur: client?.fournisseur})
        .then((res)=> {
            setScroll(false)
            navigate(`/clients/${clientid}`)
            dispatch(fetchClients())
        })
        .catch(err => {
            console.error(err);
            setScroll(false)
        })
    }

    const cond = false

  return (
    <>
        <Navbar />

        <div className='min-h-screen px-10 md:px-20 py-16 bg-gray-50 text-gray-700'>
            <h1 className='text-3xl w-full font-medium'> Update Client - <i className='text-sm'> ( {clientid} ) </i> </h1>

            <div className=' bg-white mt-10 shadow-md '>
                <h2 className='text-lg font-medium mb-2 bg-gray-100 bg-opacity-80 py-6 px-6'> General configuration </h2>

                <div className='py-6 px-6'>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Nom Complet </label>
                        <input onChange={(e)=> setName(e.target.value)} value={name} type='text' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Raison social </label>
                        <input onChange={(e)=> setRaison(e.target.value)} value={raisonsocial} type='text' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-1'> IF   </label>
                        <i className='text-sm mb-2'> Description sur IF </i>
                        <input onChange={(e)=> setIf(e.target.value)} value={iff} type='number' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-1'> ICE </label>
                        <i className='text-sm mb-2'> Description sur ICE </i>
                        <input onChange={(e)=> setIce(e.target.value)} value={ice} type='text' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Nature du Client </label>
                        <select onChange={(e)=> setNature(e.target.value)} value={natureclient} className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4'>
                            <option value={""}> Select nature de client </option>
                            <option value={"etat"}>Etat</option>
                            <option value={"collective"}>Collectivite territorieles</option>
                        </select>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Exoneration </label>
                        <div className='flex items-stretch space-x-2 mb-1'>
                            <input value={0} defaultChecked={!client?.exoneration && true} onChange={(e)=> setExoneration(e.target.value)}  name='h' id='exclus' type='radio' />
                            <label htmlFor='exclus'>Exclus</label>
                        </div>
                        <div className='flex items-stretch space-x-2'>
                            <input value={1} defaultChecked={client?.exoneration && true} onChange={(e)=> setExoneration(e.target.value)}  name='h' id='inclus' type='radio' />
                            <label htmlFor='inclus'>Inlus</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center space-x-4 mt-10 justify-end'>
                <Link to={`/clients/${clientid}`} className='bg-transparent font-medium transition-all hover:bg-white px-6 py-2'> Cancel </Link>
                <button 
                    disabled={cond}
                    onClick={CreateFun} 
                    className={`${cond ? 'opacity-40' : ' opacity-100 hover:bg-orange-600'} bg-orange-500 text-white transition-all px-4 w-40 flex justify-center items-center py-2 font-medium`}
                > 
                    {scroll ? <Spinner /> : "Update Client " }
                </button>
            </div>
        </div>

        <Footer />
    </>
  )
}

export default Update