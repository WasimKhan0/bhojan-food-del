import React from 'react' 

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './Admin.css'
import Add from '../Add/Add';
import List from '../List/List';
import Orders from '../Orders/Orders';

import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../adminComponents/Sidebar/Sidebar';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
const Admin = () => {
   const {url} = useContext(StoreContext);

  return (
    <div>
      <ToastContainer />
      <hr />
      <div className="app-content">
        
          <Sidebar></Sidebar>
      

        <Routes>
          <Route path='add' element={<Add url={url} />} />

          <Route path='list' element={<List url={url} />} />
          <Route path='orders' element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin
