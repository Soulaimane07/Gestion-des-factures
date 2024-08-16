import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { close } from './Redux/Slices/RemoveSlice'
import axios from 'axios'
import Spinner from './Spinner'
import { ServerUrl } from './Variables'
import { useNavigate } from 'react-router-dom'
import { fetchClients } from './Redux/Slices/ClientSlice'
import { fetchFournisseurs } from './Redux/Slices/FournisseurSlice'

function Remove() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const remove = useSelector(state => state.remove)
    const [scroll, setScroll] = useState(false)

    const RemoveFun = () => {
        setScroll(true)

        axios.delete(`${ServerUrl}/${remove.type === 'client' ? 'clients' : 'fournisseurs'}/${remove?.id}`)
        .then((res)=> {
            setScroll(false)
            remove.type === 'client' ? navigate('/clients') : navigate('/fournisseurs')
            dispatch(close())
            remove.type === 'client' ? dispatch(fetchClients()) : dispatch(fetchFournisseurs())
        })
        .catch(err => {
            console.error(err);
            setScroll(false)
        })
    }

  return (
    <div className='bg-black bg-opacity-30 fixed top-0 left-0 h-full w-full z-50 text-white flex items-center justify-center'>
        <div id="popup-modal"  className="">
            <div className="relative p-6 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                    <button onClick={()=> dispatch(close())} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 md:p-6 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 ">Are you sure you want to delete this {remove.type}?</h3>
                        <button onClick={RemoveFun} data-modal-hide="popup-modal" type="button" className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            {scroll ? <Spinner /> : "Yes, I'm sure"}
                        </button>
                        <button onClick={()=> dispatch(close())} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-orange-500 focus:z-10 focus:ring-4 focus:ring-gray-100">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Remove