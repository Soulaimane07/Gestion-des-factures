import { Link, useNavigate } from "react-router-dom";
import { Nodata, NodataFor } from "./Nodata";
import { fournisseurVars } from "../Variables";
import { SiMicrosoftexcel } from "react-icons/si";
import * as XLSX from 'xlsx';
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setExcel } from "../Redux/Slices/ExcelSlice";
import { GetRas } from "../Functions";

const FournisseurTableBase = ({ fournisseurs, client, showRas }) => {
    const fileInputRef = useRef(null); // Moved out of conditional logic

    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!fournisseurs?.length) {
        return client ? <NodataFor text="No fournisseurs for this client" /> : <Nodata text="No fournisseurs" />;
    }

    // Function to handle file upload
    const handleFileUpload = (event, fournisseur) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });
    
                // Example: Read the first sheet as JSON
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
    
                // Filter the rows based on the fournisseur value
                const filteredData = json.filter(row => row["FOURNISSEUR"] === fournisseur?.name);
    
                // Dispatch the filtered data along with client and fournisseur
                dispatch(setExcel({ data: filteredData, client, fournisseur }));
                
                // Navigate to the desired route
                navigate(`/clients/${client?._id}/fournisseur/${fournisseur?._id}`);
    
                // Log filtered data for debugging
                // console.log(`Filtered data for fournisseur name ${fournisseur?.name}:`, filteredData);
            };
            reader.readAsBinaryString(file);
        }
    };

    // Trigger file input click
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white text-sm text-left rtl:text-right text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Fournisseur ID</th>
                        <th scope="col" className="px-6 py-3">Nom complet</th>
                        <th scope="col" className="px-6 py-3">Raison Social</th>
                        <th scope="col" className="px-6 py-3">IF</th>
                        <th scope="col" className="px-6 py-3">ICE</th>
                        <th scope="col" className="px-6 py-3">Code tiers</th>
                        <th scope="col" className="px-6 py-3">Type activité</th>
                        {showRas && <th scope="col" className="px-6 py-3">Ras</th>}
                        {showRas &&<th scope="col" className="px-6 py-3">Excel</th>}
                    </tr>
                </thead>
                <tbody>
                    {fournisseurs.map((item) => (
                        <tr key={item._id} className="border-b text-gray-900 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                <Link to={`/fournisseurs/${item._id}`} className="hover:text-orange-500 transition-all underline text-blue-500">
                                    {item._id}
                                </Link>
                            </th>
                            <td className="px-6 py-4">{item.name}</td>
                            <td className="px-6 py-4">{item.raisonsocial}</td>
                            <td className="px-6 py-4">{item.if}</td>
                            <td className="px-6 py-4">{item.ice}</td>
                            <td className="px-6 py-4">{item.code}</td>
                            <td className="px-6 py-4">{fournisseurVars?.activite[item?.activite]?.title}</td>
                            {showRas && <td className="px-6 py-4"> {GetRas(client, item)} %</td>}
                            {showRas &&<td className="px-6 py-2">
                                <button
                                    onClick={() => handleButtonClick(item._id)}
                                    className="bg-orange-500 w-full flex justify-center py-3 hover:bg-orange-600 transition-all rounded-sm text-white"
                                >
                                    <SiMicrosoftexcel size={20} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept=".xlsx, .xls"
                                    onChange={(event) => handleFileUpload(event, item)}
                                />
                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export const FournisseurTable = (props) => <FournisseurTableBase {...props} showRas={false} />;
export const FournisseurTableClient = (props) => <FournisseurTableBase {...props} showRas={true} />;

export const FournisseurSelectTable = ({ fournisseurs, selectedfournisseurs, setFournisseurs }) => {
    const toggleFournisseur = (fournisseur) => {
        const isAlreadySelected = selectedfournisseurs.some(item => item.fournisseur === fournisseur._id);
        setFournisseurs(isAlreadySelected
            ? selectedfournisseurs.filter(item => item.fournisseur !== fournisseur._id)
            : [...selectedfournisseurs, { fournisseur: fournisseur._id, ras: 0 }]
        );
    };

    const handleRasChange = (fournisseurId, rasValue) => {
        setFournisseurs(prevFournisseurs => prevFournisseurs.map(f =>
            f.fournisseur === fournisseurId ? { ...f, ras: Number(rasValue) } : f
        ));
    };

    return (
        <div className="overflow-x-auto">
            {fournisseurs?.length ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase  bg-gray-700 text-gray-400">
                        <tr>
                            <th className="px-6 py-3"></th>
                            <th className="px-6 py-3">Fournisseur ID</th>
                            <th className="px-6 py-3">Nom complet</th>
                            <th className="px-6 py-3">Raison Social</th>
                            <th className="px-6 py-3">IF</th>
                            <th className="px-6 py-3">ICE</th>
                            <th className="px-6 py-3">Code tiers</th>
                            <th className="px-6 py-3">Type activité</th>
                        </tr>
                    </thead>
                    <tbody className="w-full ">
                        {fournisseurs.slice().reverse().map((item) => {
                            const selectedFournisseur = selectedfournisseurs.find(f => f.fournisseur === item._id);
                            return (
                                <tr key={item._id} className="border-b  w-full cursor-pointer hover:bg-gray-200 transition-all text-gray-900 border-gray-200">
                                    <td onClick={() => toggleFournisseur(item)} className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="scale-125 accent-orange-500"
                                            checked={!!selectedFournisseur}
                                            onChange={() => toggleFournisseur(item)}
                                        />
                                    </td>
                                    <th onClick={() => toggleFournisseur(item)} scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        <Link to={`/fournisseurs/${item._id}`} className="hover:text-orange-500 transition-all underline text-blue-500">
                                            {item._id}
                                        </Link>
                                    </th>
                                    {['name', 'raisonsocial', 'if', 'ice', 'code'].map((field, idx) => (
                                        <td onClick={() => toggleFournisseur(item)} key={idx} className="px-6 py-4">{item[field]}</td>
                                    ))}
                                    <td onClick={() => toggleFournisseur(item)} className="px-6 py-4">{fournisseurVars?.activite[item.activite]?.title}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <Nodata text="No fournisseurs" />
            )}
        </div>
    );
};
