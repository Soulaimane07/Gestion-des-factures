import React, { useState } from 'react'
import { LogoWhite, ServerUrl } from '../../Components/Variables'
import { DocumentTitle } from '../../Components/Functions'
import Spinner from '../../Components/Spinner'
import Error from '../../Components/Error'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { login } from '../../Components/Redux/Slices/UserSlice'
 
function Login() {
    DocumentTitle("Amazon | Login")

    const [email, setEmail] = useState("")
    const [pass, setPassword] = useState("")
    
    const [scroll, setScroll] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState(false)

    let consittion = email?.length === 0 || pass.length === 0
    const dispatch = useDispatch()
    
    const LoginFun = (event) => {
        event.preventDefault();

        setScroll(true)
        setErrorMsg(false)

        axios.post(`${ServerUrl}/users/login`, {email, pass})
            .then((res)=> {
                setScroll(false)
                setErrorMsg(false)
                dispatch(login(res.data))
            })
            .catch((err)=> {
                console.error(err);
                setScroll(false)
                setErrorMsg("Email or password are wrong !")
            })
    } 

  return (
    <div className='px-20 py-16 flex items-center justify-center h-screen text-gray-700'>
        <img src={LogoWhite} className='w-60 absolute top-14 left-20' alt='logo' />
        
        <div className='w-1/3'>
            <h1 className='text-center text-3xl font-medium mb-10'> Log in your account </h1>
            <Error error={ErrorMsg} />

            <form onSubmit={LoginFun} className="max-w-sm mx-auto mt-4">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900">Your email</label>
                    <input onChange={(e)=> setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 ">Your password</label>
                    <input onChange={(e)=> setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" />
                </div>
                
                <button 
                    disabled={consittion}
                    type="submit" 
                    className={` ${consittion ? "bg-orange-500 opacity-50" : "opacity-100 bg-orange-500 hover:bg-orange-600"}  transition-all text-white flex items-center justify-center   focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-md px-5 py-2.5 text-center  w-full`}>
                    {scroll ? <Spinner /> : "Login" }
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login