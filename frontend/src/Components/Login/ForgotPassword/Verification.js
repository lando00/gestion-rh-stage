import React, {useState} from 'react';
import { FaUserCheck } from 'react-icons/fa';
import Logo from '../../../logo/MNDPT2.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import '../Login.css';

const Verification = (props) => {
  
  const [user, setUser] = useState({
    user : '',
    matricule : '',
    cartIdNat : ''
  });

  const handleChangeInput = (e) => {
    setUser({...user, [e.target.id] : e.target.value}); 
  };

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try{
      const reponse = await axios.post("http://localhost:3001/authentification/oublierMotDePasse", data);
      if(reponse.data.message === 'VALIDE'){
        navigate(`/forgotpass/newpass/${reponse.data.resultat[0].MATRICULE_AGENT}`);
      }

    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className='login-container'>
    <div className="login">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <form action="#">

        <div className="input-container">
            <input type="text" required name='cartIdNat' id='cartIdNat' value={user.cartIdNat} onChange={(e) => {handleChangeInput(e)}} />
            <span></span>
            <label>CIN</label>
        </div>
        
          <div className="input-container">
            <input type="text" required name='matricule' id='matricule' value={user.matricule} onChange={(e) => {handleChangeInput(e)}} />
            <span></span>
            <label>N° Matricule</label>
          </div>
          
          <div className="input-container">
            <input type="text" required name='user' id='user' value={user.user} onChange={(e) => {handleChangeInput(e)}} />
            <span></span>
            <label>Nom d'utilisateur</label>
          </div>
          <button className='btn-login d-flex align-items-center justify-content-center' type="button" onClick={()=>{handleSubmit(user)}}><FaUserCheck  className='icon-btn' />Vérifier mon compte</button>
        </form>
    </div>
  </div>

  )
}

export default Verification;
