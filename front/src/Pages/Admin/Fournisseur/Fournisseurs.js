import React, { useEffect } from 'react';
import Navbar from '../../../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { DocumentTitle } from '../../../Components/Functions';
import { FournisseurTable } from '../../../Components/Tables.js/Tables';
import { MainHeader } from '../../../Components/Headers/Headers';
import { clearSearch, setSearch } from '../../../Components/Redux/Slices/FournisseurSlice';
import Footer from '../../../Components/Footer/Footer';

function Fournisseurs() {
    DocumentTitle("Fizazi & Associes | Fournisseurs");
    const dispatch = useDispatch();

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

    return (
        <>
            <Navbar />
            <div className='min-h-screen px-20 py-16 bg-gray-50 text-gray-700'>
                <MainHeader
                    header={{ title: "Fournisseurs", length: filteredFournisseurs?.length }}
                    search="Search for fournisseur name"
                    handleSearchChange={handleSearchChange}
                />
                <div className='mt-8'>
                    <FournisseurTable fournisseurs={filteredFournisseurs} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Fournisseurs;
