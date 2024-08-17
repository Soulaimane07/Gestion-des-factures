import React, { useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { ServerUrl } from '../../../Components/Variables';
import Spinner from '../../../Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../../../Components/Redux/Slices/ClientSlice';
import { DocumentTitle } from '../../../Components/Functions';
import { FournisseurSelectTable, FournisseurTable } from '../../../Components/Tables.js/Tables';
import { MainHeader } from '../../../Components/Headers/Headers';
// import Header from '../../../Components/Table/Header';

function SelectFournisseurs() {
    DocumentTitle("Amazon | Creer Client")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [scroll, setScroll] = useState(false)
    
    
    const [name, setName] = useState("")
    const [raisonsocial, setRaison] = useState("")
    const [iff, setIf] = useState(null)
    const [ice, setIce] = useState(null)
    const [natureclient, setNature] = useState("")
    const [exoneration, setExoneration] = useState(null)

    const CreateFun = () => {
        setScroll(true)

        axios.post(`${ServerUrl}/clients`, {name, raisonsocial, if: iff, ice, natureclient, exoneration})
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

    const cond = name?.length === 0 || raisonsocial?.length === 0 || iff?.length <= 0 || ice?.length <= 0 || natureclient?.length === 0 || exoneration === null





    const fournisseurs = useSelector(state => state.fournisseurs.data)


  return (
    <>
        <Navbar />

        <div className='min-h-screen px-10 md:px-20 py-16 bg-gray-50 text-gray-700'>
            <h1 className='text-3xl w-full font-medium'> Select Fournisseurs </h1>

            <div className=' p-10 py-8 bg-white mt-10 shadow-md '>
                {/* <Header header={{title:"Fournisseurs", length: fournisseurs?.length}} button="Create Fournisseur" link="/fournisseurs/create" search="Search for fournisseur" /> */}

                <div className='mt-10'> 
                    <MainHeader />
                    <FournisseurSelectTable fournisseurs={fournisseurs} />
                </div>

                {/* <div className='py-6 px-6'>
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
                </div> */}
            </div>

            <div className='flex items-center space-x-4 mt-10 justify-end'>
                <Link to={'/clients'} className='bg-transparent font-medium transition-all hover:bg-white px-6 py-2'> Cancel </Link>
                <button 
                    disabled={cond}
                    onClick={CreateFun} 
                    className={`${cond ? 'opacity-40' : ' opacity-100 hover:bg-yellow-500'} bg-yellow-400 transition-all px-4 w-40 flex justify-center items-center py-2 font-medium`}
                > 
                    {scroll ? <Spinner /> : "Finish" }
                </button>
            </div>
        </div>
    </>
  )
}

export default SelectFournisseurs