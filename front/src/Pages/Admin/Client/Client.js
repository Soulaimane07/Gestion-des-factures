import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import { Link, useParams } from 'react-router-dom';
import { DocumentTitle } from '../../../Components/Functions';
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClient } from '../../../Components/Redux/Slices/ClientSlice';
import { openRemove } from '../../../Components/Redux/Slices/RemoveSlice';
import { FournisseurTableClient } from '../../../Components/Tables.js/Tables';
import Footer from '../../../Components/Footer/Footer';
import ClientDetails from '../../../Components/Details/ClientDetails';

function Client() {
    const { clientid } = useParams();
    DocumentTitle(`Fizazi & Associes | Client`);

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                setLoading(true);
                await dispatch(fetchClient(clientid));
            } catch (err) {
                console.error('Failed to fetch client data:', err);
                setError('Failed to fetch client data');
            } finally {
                setLoading(false);
            }
        };
        fetchClientData();
    }, [clientid, dispatch]);

    const client = useSelector(state => state.clients.client);

    return (
        <>
            <Navbar />

            <div className='min-h-screen px-20 py-16 pb-40 bg-gray-50 text-gray-700'>
                <h1 className='text-3xl w-full font-medium'>
                    {client?.name} <i className='text-lg'>({client?._id})</i>
                </h1>

                {loading && <div className="text-center py-4">Loading...</div>}
                {error && <div className="text-red-500 text-center py-4">{error}</div>}

                {!loading && !error && (
                    <>
                        <div className='bg-white mt-10 shadow-md'>
                            <h2 className='flex items-center justify-between font-medium mb-2 bg-gray-100 bg-opacity-80 py-6 px-6'>
                                <p className='text-lg'>Details</p>
                                <div className='flex items-center space-x-2 text-white'>
                                    <Link to="update" className='bg-orange-500 px-6 py-2 hover:bg-orange-600 transition-all text-md'>
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => dispatch(openRemove({ id: clientid, type: "client" }))}
                                        className='bg-orange-500 px-6 py-2 hover:bg-orange-600 transition-all text-md'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </h2>
                            <ClientDetails client={client} />
                        </div>

                        <div className='bg-white mt-10 shadow-md'>
                            <div className='flex items-center w-full font-medium bg-gray-100 bg-opacity-80 py-6 px-6'>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className='flex-1 font-medium flex items-center'
                                    aria-expanded={open}
                                >
                                    {open ? <GoTriangleDown size={30} /> : <GoTriangleRight size={30} />}
                                    <p className='text-lg'>Fournisseurs ({client?.fournisseurs?.length})</p>
                                </button>
                                {client?.fournisseurs?.length > 0 && open && (
                                    <Link
                                        to='select_fournisseurs'
                                        className='bg-orange-500 hover:bg-orange-600 text-white transition-all py-2 px-5 rounded-sm font-medium'
                                    >
                                        Select or Remove Fournisseurs
                                    </Link>
                                )}
                            </div>

                            {open && (
                                <div className='pb-20'>
                                    <FournisseurTableClient fournisseurs={client?.fournisseurs} client={true} />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    );
}

export default Client;
