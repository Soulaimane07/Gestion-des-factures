import React, { useEffect } from 'react';
import Navbar from '../../../Components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { DocumentTitle } from '../../../Components/Functions';
import { MainHeader } from '../../../Components/Headers/Headers';
import { clearSearch, setSearch } from '../../../Components/Redux/Slices/ClientSlice';
import { MainCLientsTable } from '../../../Components/Tables.js/Clients';
import Footer from '../../../Components/Footer/Footer';

function Clients() {
    DocumentTitle("Fizazi & Associes | Clients");
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(clearSearch());
    }, [dispatch]); // Add dispatch to the dependency array

    const { data: clients, search } = useSelector(state => state.clients);

    const filteredClients = clients?.filter(client =>
        client?.name?.toLowerCase().includes(search?.toLowerCase())
    );

    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
    };

    return (
        <>
            <Navbar />
            
            <div className='min-h-screen px-20 py-16 bg-gray-50 text-gray-700'>
                <MainHeader
                    header={{ title: "Clients", length: filteredClients?.length }}
                    button="Create Client"
                    link="create"
                    search="Search for clients name"
                    handleSearchChange={handleSearchChange}
                />
                
                <div className='mt-8'>
                    {filteredClients?.length > 0 ? (
                        <MainCLientsTable clients={filteredClients} />
                    ) : (
                        <p>No clients found.</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Clients;
