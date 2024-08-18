import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { ServerUrl } from '../../../Components/Variables';
import Spinner from '../../../Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFournisseur, fetchFournisseurs } from '../../../Components/Redux/Slices/FournisseurSlice';
import { DocumentTitle } from '../../../Components/Functions';
import Footer from '../../../Components/Footer/Footer';

function Update() {
    DocumentTitle("Fizazi & Associes | Update Fournisseur")
    const {fournisseurid} = useParams()
    useEffect(()=> {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [scroll, setScroll] = useState(false)
    
    useEffect(()=> {
        dispatch(fetchFournisseur(fournisseurid))
    }, [fournisseurid])
    
    let fournisseur = useSelector(state => state.fournisseurs.fournisseur)
    
    
    
    const [name, setName] = useState(fournisseur?.name)
    const [raisonsocial, setRaison] = useState(fournisseur?.raisonsocial)
    const [iff, setIf] = useState(fournisseur?.if)
    const [ice, setIce] = useState(fournisseur?.ice)
    const [code, setCode] = useState(fournisseur?.code)
    const [activite, setActivite] = useState(fournisseur?.activite)

    const CreateFun = () => {
        setScroll(true)

        axios.patch(`${ServerUrl}/fournisseurs/${fournisseurid}`, {name, raisonsocial, if: iff, ice, code, activite})
        .then((res)=> {
            setScroll(false)
            navigate(`/fournisseurs/${fournisseurid}`)
            dispatch(fetchFournisseurs())
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
            <h1 className='text-3xl w-full font-medium'> Update Fournisseur - <i className='text-sm'> ( {fournisseurid} ) </i> </h1>

            <div className=' bg-white mt-10 shadow-md '>
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
                        <label className='mb-1'> Code tiers </label>
                        <i className='text-sm mb-2'> Description sur Code tiers </i>
                        <input onChange={(e)=> setCode(e.target.value)} value={code} type='text' className='border-2 border-gray-300 rounded-sm w-full md:w-1/3 py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Type d'activité </label>
                        <div className='flex items-stretch space-x-2 mb-1'>
                            <input onChange={(e)=> setActivite(e.target.value)} defaultChecked={activite === "Prestation de service" && true} value={"Prestation de service"} name='activite' id="Prestation de service" type='radio' />
                            <label htmlFor="Prestation de service">Prestation de service</label>
                        </div>
                        <div className='flex items-stretch space-x-2'>
                            <input onChange={(e)=> setActivite(e.target.value)} defaultChecked={activite === "Bien d'équipement" && true} value="Bien d'équipement" name="activite" id="Bien d'équipement" type='radio' />
                            <label htmlFor="Bien d'équipement">Bien d'équipement</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center space-x-4 mt-10 justify-end'>
                <Link to={`/fournisseurs/${fournisseurid}`} className='bg-transparent font-medium transition-all hover:bg-white px-6 py-2'> Cancel </Link>
                <button 
                    disabled={cond}
                    onClick={CreateFun} 
                    className={`${cond ? 'opacity-40' : ' opacity-100 hover:bg-orange-600'} bg-orange-500 text-white transition-all px-6 w-48 flex justify-center items-center py-2 font-medium`}
                > 
                    {scroll ? <Spinner /> : "Update Fournisseur " }
                </button>
            </div>
        </div>

        <Footer />
    </>
  )
}

export default Update