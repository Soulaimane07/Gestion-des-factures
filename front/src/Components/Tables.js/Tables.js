import { Link } from "react-router-dom"
import {Nodata, NodataFor} from "./Nodata"

export const FournisseurTable = ({fournisseurs, client}) => {
    return (
        <div className="overflow-x-auto ">
            {fournisseurs?.length > 0 &&
                <table className="w-full bg-white text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Fournisseur ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nom complet
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Raison Social
                            </th>
                            <th scope="col" className="px-6 py-3">
                                IF
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ICE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Code tiers
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type activité
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseurs?.map((item,key)=> (
                            <tr key={key} className="border-b text-gray-900 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                    <Link to={`${item?._id}`} className='hover:text-orange-500 transition-all underline text-blue-500'> {item._id} </Link>
                                </th>
                                <td className="px-6 py-4">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.raisonsocial}
                                </td>
                                <td className="px-6 py-4">
                                    {item.if}
                                </td>
                                <td className="px-6 py-4">
                                    {item.ice}
                                </td>
                                <td className="px-6 py-4">
                                    {item.code}
                                </td>
                                <td className="px-6 py-4">
                                    {item.activite}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            {fournisseurs?.length === 0 &&(
                client 
                    ?   <NodataFor text={`No fournisseurs for this client`} />
                    :   <Nodata text={`No fournisseurs`} />
            )}
        </div>
    )
}

export const FournisseurSelectTable = ({ fournisseurs, selectedfournisseurs, setFournisseurs }) => {
    const toggleFournisseur = (fournisseur) => {
        if (selectedfournisseurs.includes(fournisseur)) {
            setFournisseurs(selectedfournisseurs.filter(item => item !== fournisseur));
        } else {
            setFournisseurs([...selectedfournisseurs, fournisseur]);
        }
    }

    return (
        <div className="overflow-x-auto">
            {fournisseurs?.length > 0 ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">Fournisseur ID</th>
                            <th scope="col" className="px-6 py-3">Nom complet</th>
                            <th scope="col" className="px-6 py-3">Raison Social</th>
                            <th scope="col" className="px-6 py-3">IF</th>
                            <th scope="col" className="px-6 py-3">ICE</th>
                            <th scope="col" className="px-6 py-3">Code tiers</th>
                            <th scope="col" className="px-6 py-3">Type activité</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseurs.map((item, key) => (
                            <tr onClick={() => toggleFournisseur(item?._id)} key={key} className={`border-b cursor-pointer  hover:bg-gray-200 transition-all text-gray-900 border-gray-200`}>
                                <td className="px-6 py-4">
                                    <input 
                                        onChange={() => toggleFournisseur(item?._id)} 
                                        type="checkbox" 
                                        className="scale-125 accent-orange-500" 
                                        id={`fournisseur-${item._id}`} 
                                        checked={selectedfournisseurs.includes(item._id)}
                                    />
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                    <Link to={`/fournisseurs/${item._id}`} className='hover:text-orange-500 transition-all underline text-blue-500'>
                                        {item._id}
                                    </Link>
                                </th>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.raisonsocial}</td>
                                <td className="px-6 py-4">{item.if}</td>
                                <td className="px-6 py-4">{item.ice}</td>
                                <td className="px-6 py-4">{item.code}</td>
                                <td className="px-6 py-4">{item.activite}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <Nodata text={`No fournisseurs`} />
            )}
        </div>
    );
}