import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

function SearchBox({ search, handleSearchChange }) {
    return (
        <div className='flex items-center py-1.5 flex-1 md:flex-2 px-2 border-2 border-gray-400 rounded-sm'>
            <input
                placeholder={search}
                className='bg-transparent w-full px-2 outline-none'
                onChange={handleSearchChange}
            />
            <IoSearchOutline size={22} className='opacity-55' />
        </div>
    );
}

export default SearchBox;
