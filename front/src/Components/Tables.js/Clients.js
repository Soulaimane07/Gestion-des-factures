import { Link } from "react-router-dom"
import { GreenBadget, RedBadget } from "../Badges"
import { GoDash } from "react-icons/go"
import { Nodata } from "./Nodata"

export const MainCLientsTable = ({clients}) => {
    return (
        <div className="overflow-x-auto">
            {clients?.length > 0 &&
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Client ID
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
                                Nature Client
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Exoneration
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fournisseur
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients?.map((item, key) => (
                            <tr key={key} className="bg-white border-b border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                    <Link to={`/clients/${item._id}`} className='hover:text-orange-500 transition-all underline text-blue-500 opacity-90'>
                                        {item._id}
                                    </Link>
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
                                    {item.natureclient}
                                </td>
                                <td className="px-6 py-4">
                                    {item.exoneration
                                        ? <GreenBadget text="Inclus" />
                                        : <RedBadget text="Exclus" />
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    {item.fournisseurs
                                        ? item.fournisseurs?.length
                                        : <span className='justify-center flex'><GoDash /></span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            {clients?.length === 0 &&
                <Nodata text={`No clients`} />
            }
        </div>
    )
}

export const SecondCLientsTable = ({clients}) => {
    return (
        <div className="overflow-x-auto">
            {clients?.length > 0 &&
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Client ID
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
                                Nature Client
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Exoneration
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients?.map((item, key) => (
                            <tr key={key} className="bg-white border-b border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                    <Link to={`/clients/${item._id}`} className='hover:text-orange-500 transition-all underline text-blue-500 opacity-90'>
                                        {item._id}
                                    </Link>
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
                                    {item.natureclient}
                                </td>
                                <td className="px-6 py-4">
                                    {item.exoneration
                                        ? <GreenBadget text="Inclus" />
                                        : <RedBadget text="Exclus" />
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            {clients?.length === 0 &&
                <Nodata text={`No clients`} />
            }
        </div>
    )
}