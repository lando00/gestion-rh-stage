import React, { useState, useRef } from 'react';
import {FaEye, FaEyeSlash, FaUserPlus} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../../logo/MNDPT2.jpg';
import '../Login.css'
import { toast } from "react-toastify";

const Signup = () => {

    const [showEye1, setShowEye1] = useState(true);  
    const [showEye2, setShowEye2] = useState(true);
    const inputPassword1 = useRef(null);
    const inputPassword2 = useRef(null);

    const [user, setUser] = useState({
      user : '',
      motdepasse : '',
      motdepasseconfirmer : '',
      matricule : '',
      cin : ''
    });

    const handleChangeInput = (e) => {
      setUser({...user, [e.target.id] : e.target.value}); 
    };

    const navigate = useNavigate();

    const handleSubmit = async (e, data) => {
      e.preventDefault();
      try{
        const reponse = await axios.post("http://localhost:3001/authentification/creerlogin", data);
        toast.success(reponse.data.message);
        navigate('/');
      }catch(err){
        toast.error(err.response.data.message);
      }
    }

    const handleClickIconEye1 = () => {
        setShowEye1(!showEye1);
        showEye1 ? inputPassword1.current.attributes[0].nodeValue = 'text' : inputPassword1.current.attributes[0].nodeValue = 'password';
    }

    const handleClickIconEye2 = () => {
        setShowEye2(!showEye2);
        showEye2 ? inputPassword2.current.attributes[0].nodeValue = 'text' : inputPassword2.current.attributes[0].nodeValue = 'password';
    }

  return (
    <div className='login-container'>
        <div className="login">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>
            <form action="#" method='post'>
              <div className="input-container">
                  <input type="text" required name='cin' id='cin' value={user.cin} onChange={(e) => {handleChangeInput(e)}} />
                  <span></span>
                  <label>CIN</label>
              </div>
                <div className="input-container">
                  <input type="text" required name='matricule' id='matricule' value={user.matricule} onChange={(e) => {handleChangeInput(e)}}/>
                  <span></span>
                  <label>N° Matricule</label>
                </div>
                <div className="input-container">
                  <input type="text" required name='user' id='user' value={user.user} onChange={(e) => {handleChangeInput(e)}}/>
                  <span></span>
                  <label>Nom d'utilisateur</label>
                </div>
                <div className="input-container">
                  <input type="password" required ref={inputPassword1} name='motdepasse' id='motdepasse' value={user.motdepasse} onChange={(e) => {handleChangeInput(e)}}/>
                  <span></span>
                  <label>Mot de passe</label>
                  {
                      showEye1 ? <FaEye className='icon-eye' onClick={handleClickIconEye1} /> :  <FaEyeSlash className='icon-eye' onClick={handleClickIconEye1} />
                  }
                  </div>
                  <div className="input-container">
                  <input type="password" required ref={inputPassword2} name='motdepasseconfirmer' id='motdepasseconfirmer' value={user.motdepasseconfirmer} onChange={(e) => {handleChangeInput(e)}}/>
                  <span></span>
                  <label>Confirmation mot de passe</label>
                  {
                    showEye2 ? <FaEye className='icon-eye' onClick={handleClickIconEye2} /> :  <FaEyeSlash className='icon-eye' onClick={handleClickIconEye2} />
                  }
                </div>
                <button className='btn-login d-flex align-items-center justify-content-center' type="button" onClick={(e) => {handleSubmit(e, user)}}><FaUserPlus className='icon-btn' />Créer mon compte</button>
            </form>
        </div>
      </div>
  )
}

export default Signup;
