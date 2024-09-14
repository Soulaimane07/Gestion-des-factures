import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../../Components/Navbar';
import { openRemove } from '../../../Components/Redux/Slices/RemoveSlice';
import { useDispatch } from 'react-redux';
import { SecondCLientsTable } from '../../../Components/Tables.js/Clients';
import Footer from '../../../Components/Footer/Footer';
import { fournisseurVars, ServerUrl } from '../../../Components/Variables';
import { GreenBadget, RedBadget } from '../../../Components/Badges';
import Spinner from '../../../Components/Spinner';
import axios from 'axios'; // Assuming you're using axios for API calls
import { DocumentTitle } from '../../../Components/Functions';
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go';

function Fournisseur() {
    const { fournisseurid } = useParams();
    const dispatch = useDispatch();
    const [fournisseur, setFournisseur] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    DocumentTitle(`Fizazi & Associes | Fournisseur`);

    const [open, setOpen] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
        
        const fetchFournisseur = async () => {
            try {
                const response = await axios.get(`${ServerUrl}/fournisseurs/${fournisseurid}`);
                setFournisseur(response.data);
            } catch (err) {
                setError('Failed to fetch fournisseur data');
            } finally {
                setLoading(false);
            }
        };

        fetchFournisseur();
    }, [fournisseurid]);

    

    return (
        <>
            <Navbar />
            <div className='min-h-screen px-20 py-16 bg-gray-50 text-gray-700'>
                {loading && <Spinner />}
                {error && <div className="text-red-500">{error}</div>}

                {!loading && !error && fournisseur && (
                    <>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-3xl w-full font-medium'>
                                {fournisseur?.name} <i className='text-lg'>({fournisseur?._id})</i>
                            </h1>
                            <div className='flex items-center space-x-2'>
                                <Link to="update" className='bg-orange-500 px-6 py-2 hover:bg-orange-600 transition-all text-md text-white'>
                                    Update
                                </Link>
                                <button
                                    onClick={() => dispatch(openRemove({ id: fournisseurid, type: "fournisseur" }))}
                                    className='bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 transition-all text-md'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className='bg-white mt-10 shadow-md'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6'>
                                {Object.entries({
                                    'Account ID': fournisseur?._id,
                                    'Nom Complet': fournisseur?.name,
                                    'Raison social': fournisseur?.raisonsocial,
                                    'IF': fournisseur?.if,
                                    'ICE': fournisseur?.ice,
                                    'Code tiers': fournisseur?.code,
                                    'Exoneration': fournisseur?.exoneration ? <GreenBadget text="Inclus" /> : <RedBadget text="Exclus" />,
                                    'Type activité': fournisseurVars?.activite[fournisseur?.activite]?.title,
                                    'Forme Juridique': fournisseurVars?.forme[fournisseur?.forme]?.title,
                                    'Application de la réglementation des marchés publics': fournisseur?.reglementation ? <GreenBadget text="Oui" /> : <RedBadget text="Non" />,
                                    'Présentation de l\'attestation de régularité fiscale depuis moins de 6 mois': fournisseur?.fiscale ? <GreenBadget text="Oui" /> : <RedBadget text="Non" />
                                }).map(([label, value]) => (
                                    <div className='flex flex-col mb-6' key={label}>
                                        <label className='mb-2 opacity-60'>{label}</label>
                                        <p>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-x-auto mt-8 shadow-md">
                            <button
                                onClick={() => setOpen(!open)}
                                className='flex items-center w-full font-medium bg-gray-100 bg-opacity-80 py-6 px-6'
                                aria-expanded={open}
                            >
                                {open ? <GoTriangleDown size={30} /> : <GoTriangleRight size={30} />}
                                <p className='text-lg'>Clients ({fournisseur?.clients?.length ?? 0})</p>
                            </button>
                            {open && 
                                fournisseur?.clients?.length > 0 && (
                                    <SecondCLientsTable fournisseur={fournisseur} clients={fournisseur?.clients} />
                                )
                            }
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    );
}

export default Fournisseur;
