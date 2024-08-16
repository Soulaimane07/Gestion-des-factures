import React from 'react'

function Footer() {
    const d = new Date();
    let year = d.getFullYear();

  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} 
                <a href="https://flowbite.com/" className="hover:underline"> FIZAZI & ASSOCIES </a>. All Rights Reserved.
            </span>
        </div>
    </footer>
  )
}

export default Footer