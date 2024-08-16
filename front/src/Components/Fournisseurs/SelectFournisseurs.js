import React from 'react'
import { useSelector } from 'react-redux'
import { FournisseurTable } from '../Tables.js/Tables'

function SelectFournisseurs() {
    const fournisseurs = useSelector(state => state.fournisseurs.data)

  return (
    <div className='fixed top-0 w-full h-full bg-black bg-opacity-80'>
        <FournisseurTable fournisseurs={fournisseurs} />
    </div>
  )
}

export default SelectFournisseurs