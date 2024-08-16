import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { ServerUrl } from '../../../Components/Variables';
import Spinner from '../../../Components/Spinner';
import { fetchFournisseurs } from '../../../Components/Redux/Slices/FournisseurSlice';
import { useDispatch } from 'react-redux';
import { DocumentTitle } from '../../../Components/Functions';
import Footer from '../../../Components/Footer/Footer';

function Create() {
    DocumentTitle("Amazon | Creer Fournisseur")
    useEffect(()=> {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [scroll, setScroll] = useState(false)
    
    
    const [name, setName] = useState("")
    const [raisonsocial, setRaison] = useState("")
    const [iff, setIf] = useState(null)
    const [ice, setIce] = useState(null)
    const [code, setCode] = useState("")
    const [activite, setActivite] = useState(null)


    const CreateFun = () => {
        setScroll(true)

        axios.post(`${ServerUrl}/fournisseurs`, {name, raisonsocial, if: iff, ice, code, activite})
        .then((res)=> {
            setScroll(false)
            navigate('/fournisseurs')
            dispatch(fetchFournisseurs())
        })
        .catch(err => {
            console.error(err);
            setScroll(false)
        })
    }

    const cond = name?.length === 0 || raisonsocial?.length === 0 || iff?.length <= 0 || ice?.length <= 0 || code?.length === 0 || activite === null


  return (
    <>
        <Navbar />

        <div className='min-h-screen px-10 md:px-20 py-16 bg-gray-50 text-gray-700'>
            <h1 className='text-3xl w-full font-medium'> Create Fournisseur </h1>

            <div className=' bg-white mt-10 shadow-md '>
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
                        <input onChange={(e)=> setIce(e.target.value)} type='Number' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-1'> Code tiers </label>
                        <i className='text-sm mb-2'> Description sur Code tiers </i>
                        <input onChange={(e)=> setCode(e.target.value)} type='text' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Type d'activité </label>
                        <div className='flex items-stretch space-x-2 mb-1'>
                            <input onChange={(e)=> setActivite(e.target.value)} value={"Prestation de service"} name='activite' id="Prestation de service" type='radio' />
                            <label htmlFor="Prestation de service">Prestation de service</label>
                        </div>
                        <div className='flex items-stretch space-x-2'>
                            <input onChange={(e)=> setActivite(e.target.value)} value="Bien d'équipement" name="activite" id="Bien d'équipement" type='radio' />
                            <label htmlFor="Bien d'équipement">Bien d'équipement</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center space-x-4 mt-10 justify-end'>
                <Link to={"/fournisseurs"} className='bg-transparent font-medium transition-all hover:bg-white px-6 py-2'> Cancel </Link>
                <button 
                    disabled={cond}
                    onClick={CreateFun} 
                    className={`${cond ? 'opacity-40' : ' opacity-100 hover:bg-orange-600'} bg-orange-500 text-white transition-all px-4 w-auto flex justify-center items-center py-2 font-medium`}
                > 
                    {scroll ? <Spinner /> : "Create fournisseur " }
                </button>
            </div>
        </div>

        <Footer />
    </>
  )
}

export default Create