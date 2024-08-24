import React from 'react';
import Navbar from '../../../Components/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DocumentTitle } from '../../../Components/Functions';
import Footer from '../../../Components/Footer/Footer';

function Home() {
  DocumentTitle("Fizazi & Associes");

  // Access data from Redux store
  const clientsCount = useSelector(state => state.clients.data?.length || 0);
  const fournisseursCount = useSelector(state => state.fournisseurs.data?.length || 0);

  // Define cards array
  const cards = [
    {
      title: "Clients",
      number: clientsCount,
      link: "/clients"
    },
    {
      title: "Fournisseurs",
      number: fournisseursCount,
      link: "/fournisseurs"
    }
  ];

  return (
    <>
      <Navbar />
      
      <div className='min-h-screen px-20 py-16 bg-gray-50 text-gray-700'>
        <div className="grid gap-6 mb-8 md:mb-12 md:grid-cols-2">
          {cards.map((item, key) => (
            <Link to={item.link} key={key} className="flex flex-col hover:text-orange-500 shadow-md rounded-md p-8 bg-white text-gray-700 border-2 border-opacity-5 border-gray-600">
              <h2 className='text-xl font-semibold transition-all'> 
                {item.title} ({item.number})
              </h2> 
              <div className='mt-4 text-gray-700 hover:text-orange-500 transition-all'>
                Read more...
              </div>  
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
