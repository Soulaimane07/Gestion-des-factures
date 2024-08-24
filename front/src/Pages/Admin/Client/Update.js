import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { clientvars, ServerUrl } from '../../../Components/Variables';
import Spinner from '../../../Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClient, fetchClients } from '../../../Components/Redux/Slices/ClientSlice';
import { DocumentTitle } from '../../../Components/Functions';
import Footer from '../../../Components/Footer/Footer';
import { IoClose } from 'react-icons/io5';

function Update() {
    DocumentTitle("Fizazi & Associes | Modifier Client");
    const { clientid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [scroll, setScroll] = useState(false);
    const [client, setClient] = useState(null);
    const [name, setName] = useState("");
    const [raisonsocial, setRaison] = useState("");
    const [iff, setIf] = useState("");
    const [ice, setIce] = useState("");
    const [natureclient, setNature] = useState("");
    const [exoneration, setExoneration] = useState(null);
    const [profile, setProfile] = useState(null);
    const [image, setImage] = useState(null);

    const clientData = useSelector(state => state.clients.client);
    useEffect(() => {
        dispatch(fetchClient(clientid)).then(() => {
            setClient(clientData);
            if (clientData) {
                setName(clientData.name);
                setRaison(clientData.raisonsocial);
                setIf(clientData.if);
                setIce(clientData.ice);
                setNature(clientData.natureclient);
                setExoneration(clientData.exoneration);
                setProfile(clientData.profile);
                setImage(`${ServerUrl}/${clientData.profile}`);
            }
        });
    }, [clientid, dispatch]);

    const CreateFun = () => {
        setScroll(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('raisonsocial', raisonsocial);
        formData.append('if', iff);
        formData.append('ice', ice);
        formData.append('natureclient', natureclient);
        formData.append('exoneration', exoneration);
        formData.append('fournisseur', client?.fournisseur);

        if (profile) {
            formData.append('profile', profile);
        }

        axios.patch(`${ServerUrl}/clients/${clientid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            setScroll(false);
            navigate(`/clients/${clientid}`);
            dispatch(fetchClients());
        })
        .catch(err => {
            console.error(err);
            setScroll(false);
        });
    };

    const isFormValid = name && raisonsocial && iff && ice && natureclient && exoneration !== null;

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <>
            <Navbar />

            <div className='min-h-screen px-10 md:px-20 py-16 bg-gray-50 text-gray-700'>
                <h1 className='text-3xl w-full font-medium'> Update Client - <i className='text-sm'> ( {clientid} ) </i> </h1>

                <div className='bg-white mt-10 shadow-md'>
                    <h2 className='text-lg font-medium mb-2 bg-gray-100 bg-opacity-80 py-6 px-6'> General configuration </h2>

                    <div className='py-6 px-6 w-full md:w-1/3'>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2'>Profile</label>
                            {image && (
                                <div className='relative w-60'>
                                    <button onClick={() => { setImage(null); setProfile(null); }} className='text-white p-2 absolute top-0 right-0 bg-gray-600 hover:bg-opacity-60 transition-all rounded-md'>
                                        <IoClose size={20} />
                                    </button>
                                    <img alt="preview" className='w-full mx-auto rounded-md mb-6' src={image} />
                                </div>
                            )}
                            {!image && (
                                <div className="flex items-center justify-center">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">PNG, JPG</p>
                                        </div>
                                        <input id="dropzone-file" onChange={onImageChange} type="file" className="hidden" accept="image/png, image/jpeg" />
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2'>Nom Complet</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type='text' className='border-2 border-gray-300 rounded-sm py-1 px-4' />
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2'>Raison Social</label>
                            <input value={raisonsocial} onChange={(e) => setRaison(e.target.value)} type='text' className='border-2 border-gray-300 rounded-sm py-1 px-4' />
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-1'>IF</label>
                            <i className='text-sm mb-2'>Description sur IF</i>
                            <input value={iff} onChange={(e) => setIf(e.target.value)} type='number' className='border-2 border-gray-300 rounded-sm py-1 px-4' />
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-1'>ICE</label>
                            <i className='text-sm mb-2'>Description sur ICE</i>
                            <input value={ice} onChange={(e) => setIce(e.target.value)} type='text' className='border-2 border-gray-300 rounded-sm py-1 px-4' />
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2'>Nature du Client</label>
                            <select value={natureclient} onChange={(e) => setNature(e.target.value)} className='border-2 border-gray-300 rounded-sm py-1 px-4'>
                                <option value="">Select nature de client</option>
                                {clientvars?.nature?.map((item) => (
                                    <option value={item.val} key={item.val}>{item.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2'>Exoneration</label>
                            <div className='flex items-stretch space-x-2 mb-1'>
                                <input value={false} checked={exoneration === false} onChange={() => setExoneration(false)} name='exoneration' id='exclus' type='radio' />
                                <label htmlFor='exclus'>Exclus</label>
                            </div>
                            <div className='flex items-stretch space-x-2'>
                                <input value={true} checked={exoneration === true} onChange={() => setExoneration(true)} name='exoneration' id='inclus' type='radio' />
                                <label htmlFor='inclus'>Inclus</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex items-center space-x-4 mt-10 justify-end'>
                    <Link to={`/clients/${clientid}`} className='bg-transparent font-medium transition-all hover:bg-white px-6 py-2'>Cancel</Link>
                    <button 
                        disabled={!isFormValid}
                        onClick={CreateFun} 
                        className={`${!isFormValid ? 'opacity-40' : 'opacity-100 hover:bg-orange-600'} bg-orange-500 text-white transition-all px-4 w-40 flex justify-center items-center py-2 font-medium`}
                    >
                        {scroll ? <Spinner /> : "Update Client"}
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Update;
