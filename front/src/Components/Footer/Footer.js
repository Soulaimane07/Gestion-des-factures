import React from 'react'

function Footer() {
    const d = new Date();
    let year = d.getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-500  ">
        <div className="w-full mx-auto px-20 py-4 md:flex md:items-center md:justify-between">
            <span className="text-sm sm:text-center ">© {year} 
                <a href="https://fizazi.ma/" className="hover:underline"> FIZAZI & ASSOCIES </a>. All Rights Reserved.
            </span>
        </div>
    </footer>
  )
}

export default Footer