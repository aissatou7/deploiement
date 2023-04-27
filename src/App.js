/* import Axios from "axios" */
import React from "react";
import Dashboard from './pages/Dashboard';
import LoginForm from './pages/Connexion';
import { Route, Routes } from 'react-router-dom';
import Historiques from './pages/Historiques';
import  TableauDB  from './pages/TableauDB';
import  ParametrePlante  from './pages/ParametrePlante';
import Auth from "./pages/Auth";
import ProtectionRoutes from "./pages/ProtectionRoutes";



function App() {

  
   





  return (
  <div className='pages'>
    <>
    <Routes>
        <Route index path="/" element={<LoginForm/>} />
        <Route path='/Dashboard' element={<Auth><Dashboard/></Auth>}>
            <Route path='Historique'  element={<Auth><Historiques/></Auth>}/>
            <Route PrivateRoute exact path='ParametrePlante' element={<Auth><ParametrePlante /></Auth>}/>
            <Route path='TableauDB' element={<Auth><TableauDB /></Auth>}/>


        </Route>
        <Route path="*" element={<ProtectionRoutes />} />

    </Routes>
    </>
  </div>
  );
}
export default App;








