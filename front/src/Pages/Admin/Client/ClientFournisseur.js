import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import Footer from '../../../Components/Footer/Footer'
import { useSelector } from 'react-redux'
import ClientDetails from '../../../Components/Details/ClientDetails'
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go'
import FournisseurDetails from '../../../Components/Details/FournisseurDetails'
import * as XLSX from 'xlsx';
import Spinner from '../../../Components/Spinner'

function ClientFournisseur() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const excelData = useSelector(state => state.excel)

    const [openC, setOpenC] = useState(false);
    const [openF, setOpenF] = useState(false);





    const handleExportToExcel = () => {
        const dataWithExtras = excelData?.data?.map(item => ({
            FOURNISSEUR: excelData?.fournisseur?.name,  // Add client name field
            CLIENT: excelData?.client?.name,  // Add client name field
            RAS: excelData?.fournisseur?.ras,  // Add RAS field
            "MONTANT RAS": (item[" TVA "] ?? item["TVA"] ?? item["tva"]) * excelData?.fournisseur?.ras / 100,  // Add RAS field
            ...item,  // Keep existing fields
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataWithExtras);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

        XLSX.writeFile(workbook, 'exported_data.xlsx');
    };

    
    const cleanedData = excelData?.data?.map(({ "FOURNISSEUR": _, ...rest }) => rest);
    let keys = cleanedData?.length > 0 ? Object.keys(cleanedData[0]) : [];
   
    
    const [show, setShow] = useState(false)

    useEffect(()=> {
        setShow(false)

        setTimeout(() => {
            setShow(true)
        }, 2000);
    }, [])


  return (
        <>
            <Navbar />

            <div className='min-h-screen px-20 py-16 pb-40 bg-gray-50 text-gray-700'>
                <h1 className='text-3xl w-full font-medium'>
                    Page Title
                </h1>

                <div className='bg-white mt-10 shadow-md'>
                    <button
                        onClick={() => setOpenC(!openC)}
                        className='flex items-center w-full font-medium bg-gray-100 bg-opacity-80 py-6 px-6'
                    >
                        {openC ? <GoTriangleDown size={30} /> : <GoTriangleRight size={30} />}
                        <p className='text-lg'>Client</p>
                    </button>
                    {openC && 
                        <ClientDetails client={excelData?.client} />
                    }
                </div>
                <div className='bg-white mt-10 shadow-md'>
                    <button
                        onClick={() => setOpenF(!openF)}
                        className='flex items-center w-full font-medium bg-gray-100 bg-opacity-80 py-6 px-6'
                    >
                        {openF ? <GoTriangleDown size={30} /> : <GoTriangleRight size={30} />}
                        <p className='text-lg'>Fournisseur</p>
                    </button>
                    {openF && 
                        <FournisseurDetails fournisseur={excelData?.fournisseur} />
                    }
                </div>

                <div className='bg-white mt-10 shadow-md '>
                    <h2 className='flex items-center justify-between font-medium  bg-gray-100 bg-opacity-80 py-6 px-8'>
                        <p className='text-lg'> Details </p>
                        <div className='flex items-center space-x-2 text-white'>
                            {keys?.length > 0 & show &&
                                <button
                                    onClick={handleExportToExcel}
                                    className='bg-orange-500 px-6 py-2 hover:bg-orange-600 transition-all text-md'
                                >
                                    Export Excel
                                </button>
                            }
                        </div>
                    </h2>
                    {show 
                        ? 
                            <div className="overflow-x-auto">
                                {keys?.length > 0 &&    
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                                        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                                            <tr>
                                                {keys?.map((item,key)=>(
                                                    item !== 'FOURNISSEUR' && <th className="px-6 py-3" key={key}>{item}</th>
                                                ))}
                                                <th className="px-6 py-3"> Taux Ras</th>
                                                <th className="px-6 py-3"> Montant Ras</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cleanedData?.map((row, rowIndex) => (
                                                <tr key={rowIndex} className="border-b text-gray-900 border-gray-200">
                                                    {keys.map((key, cellIndex) => (
                                                        <td className="px-6 py-4" key={cellIndex}>
                                                            {row[key]}
                                                        </td>
                                                    ))}
                                                    <td className="px-6 py-4">
                                                        {excelData?.fournisseur?.ras} %
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {(row[" TVA "] ?? row["TVA"] ?? row["tva"]) * excelData?.fournisseur?.ras / 100} DH
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        :
                            <div className='flex items-center justify-center pt-2 pb-10 bg-gray-100'> 
                                <Spinner />
                            </div>
                    }
                </div>
            </div>

            <Footer />
        </>
  )
}

export default ClientFournisseur