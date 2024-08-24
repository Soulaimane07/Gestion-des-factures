import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../../../Components/Variables';
import Spinner from '../../../Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClient, fetchClients } from '../../../Components/Redux/Slices/ClientSlice';
import { DocumentTitle } from '../../../Components/Functions';
import { FournisseurSelectTable } from '../../../Components/Tables.js/Tables';
import { MainHeader } from '../../../Components/Headers/Headers';
import { clearSearch, fetchFournisseurs, setSearch } from '../../../Components/Redux/Slices/FournisseurSlice';
import Footer from '../../../Components/Footer/Footer';
import ClientDetails from '../../../Components/Details/ClientDetails';
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go';

function SelectFournisseurs() {
    DocumentTitle("Fizazi & Associes | Select fournisseurs");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [scroll, setScroll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { clientid } = useParams();
    const client = useSelector(state => state.clients.client);

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

    const [selectedFournisseurs, setFournisseurs] = useState([]);

    useEffect(() => {
        if (client?.fournisseurs) {
            const updatedFournisseurs = client.fournisseurs.map(item => ({
                fournisseur: item._id,
                ras: item.ras
            }));
            setFournisseurs(updatedFournisseurs);
        }
    }, [client]);

    const handleSelectFournisseurs = async () => {
        try {
            setScroll(true);
            await axios.post(`${ServerUrl}/clientsfour`, { client, fournisseurs: selectedFournisseurs });
            dispatch(fetchClients());
            dispatch(fetchFournisseurs());
            navigate(`/clients/${client?._id}`);
        } catch (err) {
            console.error('Failed to select fournisseurs:', err);
            setError('Failed to select fournisseurs');
        } finally {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(clearSearch());
    }, [dispatch]);

    const { data: fournisseurs, search } = useSelector(state => state.fournisseurs);
    const filteredFournisseurs = fournisseurs?.filter(fournisseur =>
        fournisseur?.name?.toLowerCase().includes(search?.toLowerCase())
    );

    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
    };

    const [open, setOpen] = useState(false);
    const isDisabled = selectedFournisseurs.length === 0; // Update this based on your condition

    return (
        <>
            <Navbar />
            <div className='min-h-screen px-10 md:px-20 py-16 bg-gray-50 text-gray-700'>
                <h1 className='text-3xl w-full font-medium'>Select Fournisseurs</h1>

                {loading && <Spinner />}
                {error && <div className="text-red-500">{error}</div>}

                {!loading && !error && (
                    <>
                        <div className='bg-white mt-10 shadow-md'>
                            <button onClick={() => setOpen(!open)} className='w-full font-medium mb-2 bg-gray-100 bg-opacity-80 py-6 px-6 flex items-center'>
                                {open ? <GoTriangleDown size={30} /> : <GoTriangleRight size={30} />}
                                <p className='text-lg'>Client Details</p>
                            </button>

                            {open && <ClientDetails client={client} />}
                        </div>

                        <div className='p-10 py-8 bg-white mt-10 shadow-md'>
                            <div className='mt-1 space-y-10'>
                                <MainHeader
                                    header={{ title: "Fournisseurs", length: filteredFournisseurs?.length }}
                                    button="Create fournisseur"
                                    link="/fournisseurs/create"
                                    search="Search for fournisseur name"
                                    handleSearchChange={handleSearchChange}
                                    select={true}
                                />
                                <FournisseurSelectTable
                                    fournisseurs={filteredFournisseurs}
                                    selectedfournisseurs={selectedFournisseurs}
                                    setFournisseurs={setFournisseurs}
                                />
                            </div>
                        </div>

                        <div className='flex items-center space-x-4 mt-10 justify-end'>
                            <Link to={`/clients/${client?._id}`} className='bg-transparent font-medium transition-all hover:bg-white px-6 py-2'>Cancel</Link>
                            <button
                                disabled={isDisabled}
                                onClick={handleSelectFournisseurs}
                                className={`${isDisabled ? 'opacity-40' : 'opacity-100 hover:bg-orange-600'} bg-orange-500 text-white transition-all px-4 w-56 flex justify-center items-center py-2 font-medium`}
                            >
                                {scroll ? <Spinner /> : "Select Fournisseurs"}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    );
}

export default SelectFournisseurs;
