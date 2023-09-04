import React, { useState, useRef } from 'react';
import {FaEye, FaEyeSlash, FaUserPlus} from 'react-icons/fa';
import Logo from '../../assets/img/logo_mndpt.png';

const Signup = () => {

    const [showEye1, setShowEye1] = useState(true);
    const inputPassword1 = useRef(null);
  
    const [showEye2, setShowEye2] = useState(true);
    const inputPassword2 = useRef(null);

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
            <form action="#">
            <div className="input-container">
                <input type="text" required />
                <span></span>
                <label>CIN</label>
            </div>
              <div className="input-container">
                <input type="text" required />
                <span></span>
                <label>N° Matricule</label>
              </div>
              <div className="input-container">
                <input type="text" required />
                <span></span>
                <label>Nom d'utilisateur</label>
              </div>
              <div className="input-container">
                <input type="password" required ref={inputPassword1} />
                <span></span>
                <label>Mot de passe</label>
                {
                    showEye1 ? <FaEye className='icon-eye' onClick={handleClickIconEye1} /> :  <FaEyeSlash className='icon-eye' onClick={handleClickIconEye1} />
                }
                </div>
                <div className="input-container">
                <input type="password" required ref={inputPassword2} />
                <span></span>
                <label>Confirmation mot de passe</label>
                {
                  showEye2 ? <FaEye className='icon-eye' onClick={handleClickIconEye2} /> :  <FaEyeSlash className='icon-eye' onClick={handleClickIconEye2} />
                }
              </div>
              <button className='btn-login' type="submit"><FaUserPlus style={ {verticalAlign:'top', fontWeight: '700'} } size={18} className='icon-btn' />Créer mon compte</button>
            </form>
        </div>
      </div>
  )
}

export default Signup;
