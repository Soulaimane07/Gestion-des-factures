import { Link } from "react-router-dom";
import SearchBox from "../Search/SearchBox";

export const MainHeader = ({ header, button, link, search, handleSearchChange, select }) => {
    return (
        <div className='flex flex-col md:flex-row text-gray-700 items-center justify-between'>
            <h1 className={`${select ? "text-xl" : "text-3xl"} w-full font-medium`}>
                {header?.title} ({header?.length})
            </h1>
            <div className='flex w-full mt-6 md:mt-0 justify-end space-x-4 items-stretch'>
                <SearchBox search={search} handleSearchChange={handleSearchChange} />
                
                {button && (
                    <Link
                        to={link}
                        className='bg-orange-500 text-white px-6 py-2 font-medium rounded-sm hover:bg-orange-600 transition-all'
                    >
                        {button}
                    </Link>
                )}
            </div>
        </div>
    );
};
