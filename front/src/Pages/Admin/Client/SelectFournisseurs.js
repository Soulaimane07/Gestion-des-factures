import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { ServerUrl } from '../../../Components/Variables';
import Spinner from '../../../Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClient, fetchClients } from '../../../Components/Redux/Slices/ClientSlice';
import { DocumentTitle } from '../../../Components/Functions';
import { FournisseurSelectTable } from '../../../Components/Tables.js/Tables';
import { MainHeader } from '../../../Components/Headers/Headers';
import { clearSearch, fetchFournisseurs, setSearch } from '../../../Components/Redux/Slices/FournisseurSlice';
import { GreenBadget, RedBadget } from '../../../Components/Badges';
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go';
import Footer from '../../../Components/Footer/Footer';

function SelectFournisseurs() {
    DocumentTitle("Fizazi & Associes | Select fournisseurs")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [scroll, setScroll] = useState(false)


    const {clientid} = useParams()
    
    const client = useSelector(state => state.clients.client)

    useEffect(()=> {
        dispatch(fetchClient(clientid))
    }, [clientid])








    
    
    const [Selectedfournisseurs, setFournisseurs] = useState([])

    useEffect(() => {
        if (client?.fournisseurs) {
            const fournisseurIds = client.fournisseurs.map(item => item?._id);
            setFournisseurs(fournisseurIds);
        }
    }, [client])


    const SelectFun = () => {
        setScroll(true)

        axios.post(`${ServerUrl}/clients/selectfournisseurs`, {client, fournisseurs: Selectedfournisseurs})
            .then((res)=> {
                setScroll(false)
                navigate(`/clients/${client?._id}`)
                dispatch(fetchClients())
                dispatch(fetchFournisseurs())
            })
            .catch(err => {
                console.error(err);
                setScroll(false)
            })
    }


    const cond = false





    











    useEffect(()=> {
        window.scrollTo(0, 0)
        dispatch(clearSearch())
    }, [])

    const { data: fournisseurs, search } = useSelector(state => state.fournisseurs);

    const filteredFournisseurs = fournisseurs?.filter(fournisseur =>
        fournisseur?.name?.toLowerCase().includes(search?.toLowerCase())
    );

    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
    }


    const [open, setOpen] = useState(false)


  return (
    <>
        <Navbar />

        <div className='min-h-screen px-10 md:px-20 py-16 bg-gray-50 text-gray-700'>
            <h1 className='text-3xl w-full font-medium'> Select Fournisseurs </h1>

            <div className=' bg-white mt-10 shadow-md '>
                <button onClick={()=> setOpen(!open)} className='w-full font-medium mb-2 bg-gray-100 bg-opacity-80 py-6 px-6 flex items-center'> 
                    {open ? <GoTriangleDown size={30} /> : <GoTriangleRight size={30} /> }
                    <p className='text-lg'> Client Details </p>
                </button>
                
                {open &&(
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8'>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> Account ID </label>
                            <p> {client?._id} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> Nom Complet </label>
                            <p> {client?.name} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> Raison social </label>
                            <p> {client?.raisonsocial} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> IF <i className='text-sm mb-2 opacity-80'> | Description sur IF </i>  </label>
                            <p> {client?.if} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> ICE <i className='text-sm mb-2 opacity-80'> | Description sur ICE </i> </label>
                            <p> {client?.ice} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> Nature du Client </label>
                            <p> {client?.natureclient} </p>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 opacity-60'> Exoneration </label>
                            <p>
                                {client?.exoneration 
                                    ?   <GreenBadget text="Inclus" /> 
                                    :   <RedBadget text="Exclus" />  
                                }
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className=' p-10 py-8 bg-white mt-10 shadow-md '>
                <div className='mt-1 space-y-10'> 
                    <MainHeader
                        header={{title:"Fournisseurs", length: filteredFournisseurs?.length}}
                        button="Create fournisseur"
                        link="/fournisseurs/create"
                        search="Search for fournisseur name"
                        handleSearchChange={handleSearchChange}
                        select={true}
                    />
                    <FournisseurSelectTable fournisseurs={filteredFournisseurs} selectedfournisseurs={Selectedfournisseurs} setFournisseurs={setFournisseurs} />
                </div>
            </div>

            <div className='flex items-center space-x-4 mt-10 justify-end'>
                <Link to={`/clients/${client?._id}`} className='bg-transparent font-medium transition-all hover:bg-white px-6 py-2'> Cancel </Link>
                <button 
                    disabled={cond}
                    onClick={SelectFun} 
                    className={`${cond ? 'opacity-40' : ' opacity-100 hover:bg-orange-600'} bg-orange-500 text-white transition-all px-4 w-56 flex justify-center items-center py-2 font-medium`}
                > 
                    {scroll ? <Spinner /> : "Select Fournisseurs" }
                </button>
            </div>
        </div>

        <Footer />
    </>
  )
}

export default SelectFournisseurs