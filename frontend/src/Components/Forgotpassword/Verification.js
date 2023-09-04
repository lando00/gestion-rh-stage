import React from 'react';
import { FaUserCheck } from 'react-icons/fa';
import Logo from '../../assets/img/logo_mndpt.png';

const Verification = () => {
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
          <button className='btn-login' type="submit"><FaUserCheck style={ {verticalAlign:'top', fontWeight: '700'} } size={18} className='icon-btn' />Vérifier mon compte</button>
        </form>
    </div>
  </div>

  )
}

export default Verification;
