import React, { useState } from 'react'
import { LogoWhite } from './Variables'
import {useDispatch, useSelector} from 'react-redux'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { logout } from './Redux/Slices/UserSlice';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    const user = useSelector(state => state.user.data)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
   
    const pages = [
        {
            "title": "Clients",
            "link": '/clients'
        },
        {
            "title": "Fournisseurs",
            "link": "/fournisseurs"
        }
    ]

  return (
    <nav>
        <div className=' z-50 sticky top-0 text-gray-700 w-full left-0 py-4 pt-6 px-6 md:px-20 pr-6 md:pr-16 flex justify-between items-center'>
            <div className='flex items-center space-x-12'>
                <Link to={'/'}>
                    <img src={LogoWhite} alt='logo' className='w-56' />
                </Link>

                <ul className='flex items-center space-x-6' >
                    {pages?.map((item,key)=> (
                        <NavLink 
                            to={item.link} 
                            key={key} 
                            className={({ isActive }) =>
                                isActive
                                    ? "hover:text-orange-600 transition-all font-medium text-orange-400"
                                    : "hover:text-orange-600 transition-all font-medium"
                            }
                        > 
                            {item.title} 
                        </NavLink>
                    ))}
                </ul>
            </div>

            <button 
                onClick={()=> setOpen(!open)} 
                className={`flex items-center space-x-2  hover:text-orange-500 transition-all ${open && 'text-orange-400 '}`}
            >
                <p> {user?.fname} {user?.fname} </p>
                <i className='flex items-center'> 
                    {open 
                        ?   <GoTriangleUp size={20} /> 
                        :   <GoTriangleDown size={20} /> 
                    }
                </i>
            </button>
        </div>
    
        <div
            className={`${open ? 'top-18 opacity-100 inline transition-all' : '-top-14 opacity-0 hidden transition-all'} text-left z-50 border-t-2 border-black border-opacity-5 shadow-md transition-all px-6 py-4 absolute right-0 bg-white w-80`}
        >
            <h1 className='text-sm opacity-80 mb-6'> Account ID: {user?._id} </h1>
            <button onClick={()=> dispatch(logout())} className='w-full bg-orange-400 hover:bg-orange-600 transition-all py-2 rounded-md text-white'> Logout </button>
        </div>
    </nav>
  )
}

export default Navbar