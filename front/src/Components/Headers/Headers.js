import { Link } from "react-router-dom"
import SearchBox from "../Table/SearchBox"

export const MainHeader = ({ header, button, link, search, handleSearchChange }) => {
    return (
        <div className='flex text-gray-700 items-center justify-between'>
            <h1 className='text-3xl w-full font-medium'>{header?.title} ({header?.length})</h1>
            <div className='flex w-full justify-end space-x-4 items-stretch'>
                <SearchBox search={search} handleSearchChange={handleSearchChange} />
                
                <Link to={link} className='bg-orange-500 text-white px-6 py-2 font-medium rounded-sm hover:bg-orange-600 transition-all'>
                    {button}
                </Link>
            </div>
        </div>
    )
}
