import React from 'react'
import Home from '../Pages/Admin/Home/Home'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Clients from '../Pages/Admin/Client/Clients';
import CreateClient from '../Pages/Admin/Client/Create';
import Fournisseurs from '../Pages/Admin/Fournisseur/Fournisseurs';
import CreateFour from '../Pages/Admin/Fournisseur/Create';
import Client from '../Pages/Admin/Client/Client';
import Fournisseur from '../Pages/Admin/Fournisseur/Fournisseur';
import UpdateClient from '../Pages/Admin/Client/Update';
import UpdateFour from '../Pages/Admin/Fournisseur/Update';
import Remove from '../Components/Remove';
import { useSelector } from 'react-redux';
import SelectFournisseurs from '../Pages/Admin/Client/SelectFournisseurs';

function Admin() {
  const openned = useSelector(state => state.remove.oppened)
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/clients'>
          <Route index element={<Clients />} />
          <Route path="create" element={<CreateClient />} />
          <Route path=":clientid" element={<Client />} />
          <Route path=":clientid/update" element={<UpdateClient />} />
          <Route path=":clientid/select_fournisseurs" element={<SelectFournisseurs />} />
        </Route>
        <Route path='/fournisseurs'>
          <Route index element={<Fournisseurs />} />
          <Route path="create" element={<CreateFour />} />
          <Route path=":fournisseurid" element={<Fournisseur />} />
          <Route path=":fournisseurid/update" element={<UpdateFour />} />
        </Route>
        
        <Route path='/*' element={<Navigate to="/" replace={true} />} />
      </Routes>

      {openned && <Remove />}
    </BrowserRouter>
  )
}

export default Admin