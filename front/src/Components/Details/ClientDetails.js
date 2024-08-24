import React from 'react'
import { clientvars, ServerUrl } from '../Variables'
import { GreenBadget, RedBadget } from '../Badges'
import { GoDash } from 'react-icons/go'

function ClientDetails({client}) {
  return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8'>
            <div className='flex flex-col mb-6'>
                <label className='mb-2 opacity-60'> Profile </label>
                {client?.profile ? <img src={`${ServerUrl}/${client?.profile}`} alt='profile' className='min-w-40 max-w-60' /> : <span className=''><GoDash /></span>}
            </div>
            <div className='flex flex-col mb-6'>
                <label className='mb-2 opacity-60'> Account ID </label>
                <p> {client?._id} </p>
            </div>
            <div className='flex flex-col mb-6'>
                <label className='mb-2 opacity-60'> Nom Complet </label>
                <p> {client?.name} </p>
            </div>
            <div className='flex flex-col mb-6'>
                <label className='mb-2 opacity-60'> Raison social </label>
                <p> {client?.raisonsocial} </p>
            </div>
            <div className='flex flex-col mb-6'>
                <label className='mb-2 opacity-60'> IF <i className='text-sm mb-2 opacity-80'> | Description sur IF </i>  </label>
                <p> {client?.if} </p>
            </div>
            <div className='flex flex-col mb-6'>
                <label className='mb-2 opacity-60'> ICE <i className='text-sm mb-2 opacity-80'> | Description sur ICE </i> </label>
                <p> {client?.ice} </p>
            </div>
            <div className='flex flex-col mb-6'>
                <label className='mb-2 opacity-60'> Nature du Client </label>
                <p className='pr-20'> {clientvars?.nature[client?.natureclient]?.title} </p>
            </div>
            <div className='flex flex-col mb-6'>
                <label className='mb-2 opacity-60'> Exoneration </label>
                <p>
                    {client?.exoneration 
                        ?   <GreenBadget text="Inclus" /> 
                        :   <RedBadget text="Exclus" />  
                    }
                </p>
            </div>
        </div>
  )
}

export default ClientDetails