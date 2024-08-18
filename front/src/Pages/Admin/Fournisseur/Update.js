import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { fournisseurVars, ServerUrl } from '../../../Components/Variables';
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
    const [exoneration, setExoneration] = useState(fournisseur?.exoneration)
    const [forme, setForme] = useState(fournisseur?.forme)
    const [reglementation, setReglementation] = useState(fournisseur?.reglementation)
    const [fiscale, setFiscale] = useState(fournisseur?.fiscale)
    

    const CreateFun = () => {
        setScroll(true)

        axios.patch(`${ServerUrl}/fournisseurs/${fournisseurid}`, {name, raisonsocial, if: iff, ice, code, activite, exoneration, forme, reglementation, fiscale})
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
                <div className='py-6 px-6 w-full md:w-1/2'>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Nom Complet </label>
                        <input onChange={(e)=> setName(e.target.value)} value={name} type='text' className='border-2 border-gray-300 rounded-sm py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Raison social </label>
                        <input onChange={(e)=> setRaison(e.target.value)} value={raisonsocial} type='text' className='border-2 border-gray-300 rounded-sm py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-1'> IF   </label>
                        <i className='text-sm mb-2'> Description sur IF </i>
                        <input onChange={(e)=> setIf(e.target.value)} value={iff} type='number' className='border-2 border-gray-300 rounded-sm py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-1'> ICE </label>
                        <i className='text-sm mb-2'> Description sur ICE </i>
                        <input onChange={(e)=> setIce(e.target.value)} value={ice} type='text' className='border-2 border-gray-300 rounded-sm py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-1'> Code tiers </label>
                        <i className='text-sm mb-2'> Description sur Code tiers </i>
                        <input onChange={(e)=> setCode(e.target.value)} value={code} type='text' className='border-2 border-gray-300 rounded-sm py-1 px-4' />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Exoneration </label>
                        <div className='grid grid-cols-2 items-start space-x-4'>
                            <button onClick={()=> setExoneration(false)} className='flex items-stretch space-x-2 mb-1 border-2 p-4'>
                                <input onChange={(e)=> setExoneration(e.target.value)} value={false} checked={exoneration === 0} name='exoneration' id='exclus' type='radio' />
                                <label htmlFor='exclus'>Exclus</label>
                            </button>
                            <button onClick={()=> setExoneration(true)} className='flex items-stretch space-x-2 mb-1 border-2 p-4'>
                                <input onChange={(e)=> setExoneration(e.target.value)} value={true} checked={exoneration === 1} name='exoneration' id='inclus' type='radio' />
                                <label htmlFor='inclus'>Inlus</label>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Type d'activité </label>
                        <div className='grid grid-cols-2 items-start text-left space-x-4'>
                            <button onClick={()=> setActivite(0)} className='flex items-stretch space-x-2 mb-1 border-2 p-4'>
                                <input onChange={(e)=> setActivite(e.target.value)} value={0} checked={activite === 0} name='activite' id={fournisseurVars?.activite[0].title} type='radio' />
                                <label htmlFor={fournisseurVars?.activite[0].title}> {fournisseurVars?.activite[0].title} </label>
                            </button>
                            <button onClick={()=> setActivite(1)} className='flex items-stretch space-x-2 mb-1 border-2 p-4'>
                                <input onChange={(e)=> setActivite(e.target.value)} value={1} checked={activite === 1} name='activite' id={fournisseurVars?.activite[1].title} type='radio' />
                                <label htmlFor={fournisseurVars?.activite[1].title}> {fournisseurVars?.activite[1].title} </label>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Forme Juridique </label>
                        <div className='grid grid-cols-2 items-start text-left space-x-4'>
                            <button onClick={()=> setForme(0)} className='flex items-stretch space-x-2 mb-1 border-2 p-4'>
                                <input onChange={(e)=> setForme(e.target.value)} value={0} checked={forme === 0} name='forme' id={fournisseurVars?.forme[0].title} type='radio' />
                                <label htmlFor={fournisseurVars?.forme[0].title}> {fournisseurVars?.forme[0].title} </label>
                            </button>
                            <button onClick={()=> setForme(1)} className='flex items-stretch space-x-2 mb-1 border-2 p-4'>
                                <input onChange={(e)=> setForme(e.target.value)} value={1} checked={forme === 1} name='forme' id={fournisseurVars?.forme[1].title} type='radio' />
                                <label htmlFor={fournisseurVars?.forme[1].title}> {fournisseurVars?.forme[1].title} </label>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Application de la réglementation des marchés publics </label>
                        <div className='grid grid-cols-2 items-start space-x-4'>
                            <button onClick={()=> setReglementation(true)} className='flex items-stretch space-x-2 mb-1 border-2 p-4'>
                                <input onChange={(e)=> setReglementation(e.target.value)} value={true} checked={reglementation === true} name='reglementation' id='oui' type='radio' />
                                <label htmlFor='oui'>Oui</label>
                            </button>
                            <button onClick={()=> setReglementation(false)} className='flex items-stretch space-x-2 mb-1 border-2 p-4'>
                                <input onChange={(e)=> setReglementation(e.target.value)} value={false} checked={reglementation === false} name='reglementation' id='non' type='radio' />
                                <label htmlFor='non'>Non</label>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <label className='mb-2'> Présentation de l'attestation de régularité fiscale depuis moins de 6 mois </label>
                        <div className='grid grid-cols-2 items-start space-x-4'>
                            <button onClick={()=> setFiscale(true)} className='flex items-stretch space-x-2 mb-1 border-2 p-4'>
                                <input onChange={(e)=> setFiscale(e.target.value)} value={true} checked={fiscale === true} name='fiscale' id='oui' type='radio' />
                                <label htmlFor='oui'>Oui</label>
                            </button>
                            <button onClick={()=> setFiscale(false)} className='flex items-stretch space-x-2 mb-1 border-2 p-4'>
                                <input onChange={(e)=> setFiscale(e.target.value)} value={false} checked={fiscale === false} name='fiscale' id='non' type='radio' />
                                <label htmlFor='non'>Non</label>
                            </button>
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