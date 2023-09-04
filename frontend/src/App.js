import './App.css';
import React, { Fragment, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Autorisation from './Components/Autorisation/Autorisation';
import Pointage from './Components/Pointage/Pointage';
import Permission from './Components/Permission/Permission';
import Conge from './Components/Conge/Conge';
import Personnels from './Components/Personnels/Personnels';
import Mission from './Components/Mission/Mission';
import ProfilePersonnel from './Components/Personnels/ProfilePersonnel/ProfilePersonnel';
import RequireAuth from './Components/Security/RequireAuth';
import Unauthorized from './Components/Unauthorized/Unauthorized';
import Dashboard from './Components/Dashboard/Dashboard';
import Signup from './Components/Login/Signup/Signup';
import NewPassword from './Components//Login/ForgotPassword/NewPassword';
import Verification from './Components/Login/ForgotPassword/Verification';
import Layout from './Components/Layout/Layout';
import NouvelleMission from './Components/Mission/NouvelleMission';
import Notfound from './Components/Notfound/Notfound';
import NouveauPersonnel from './Components/Personnels/NouveauPersonnel/NouveauPersonnel';
import ModificationPersonnel from './Components/Personnels/ModificationPersonnel/ModificationPersonnel';
import ModificationAvancement from './Components/Personnels/ModificationAvancement/ModificationAvancement';
import ChangePassword from './Components/Personnels/ChangePassword/ChangePassword';

import Aos from 'aos';
import 'aos/dist/aos.css';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <Fragment>
      
      <Routes>
        <Route path='/mndpt' element = { <Layout /> } >

          <Route element = { <RequireAuth allowedRoles = {['superadmin', 'admin']} />} >
            <Route path='/mndpt/dashboard' element = { <Dashboard />} />
            <Route path='/mndpt/personnel' element = { <Personnels />} />
          </Route>

          <Route element = { <RequireAuth allowedRoles = {['superadmin', 'admin', 'utilisateur']} />} >
            <Route path='/mndpt/autorisation' element = { <Autorisation />} />
            <Route path='/mndpt/permission' element = { <Permission />} />
            <Route path='/mndpt/conge' element = { <Conge />} />
            <Route path='/mndpt/mission' element = { <Mission />} >
              <Route element = { <RequireAuth allowedRoles={['superadmin']}/>} >
                <Route path='/mndpt/mission/nouvellemission' element={<NouvelleMission />} />
              </Route>
            </Route>
            <Route path='/mndpt/personnels/nouveau' element={<NouveauPersonnel />} />
            <Route path='/mndpt/personnels/modifier/:id' element={<ModificationPersonnel />} />
            <Route path='/mndpt/personnels/modifierAvancement/:id' element={<ModificationAvancement />} />
            <Route path='/mndpt/personnels/profile/:id' element={<ProfilePersonnel aos="fade-up" aos_offset="100" />} />
            <Route path='/mndpt/pointage' element = { <Pointage />} />
            <Route path='/mndpt/personnels/modifier_pwd' element = { <ChangePassword />} />
            <Route path='/mndpt/unauthorized' element = { <Unauthorized />} />
          </Route>

        </Route>


        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<Verification />} />
        <Route path="/forgotpass/newpass/:matricule" element={<NewPassword />} />
        <Route element= { <Notfound />} />

      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
