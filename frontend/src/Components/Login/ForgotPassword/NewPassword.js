import React, { useState, useRef } from 'react';
import {FaEye, FaEyeSlash, FaCheck} from 'react-icons/fa';
import Logo from '../../../logo/MNDPT2.jpg';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useCustomeContext from '../../Context/useCustomeContext';
import '../Login.css';


const NewPassword = () => {

  const {
    setShowToast,
    setIsSuccess,
    setToastMessage,
    setToastTitle,
    setShowScanner,
    setInfoPersonnel,
    infoPersonnel,
    stopScan, 
    setStopScan
  } = useCustomeContext();


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

    const [user, setUser] = useState({
        user : '',
        nouveaumotdepasse : '',
        confirmernouveaumotdepasse : '',
        matricule : '',
        cin : ''
      });
  
      const handleChangeInput = (e) => {
        setUser({...user, [e.target.id] : e.target.value}); 
      };

      const params = useParams();
      const navigate = useNavigate();
      const handleSubmit = async (e, data) => {
        e.preventDefault();
        try{
          const reponse = await axios.post(`http://localhost:3001/authentification/nouveauMotDePasse/${params.matricule}`, data);
          // toast.success(reponse.data.message);
          setToastTitle('Nouveau mot de passe')
          setToastMessage(reponse.data.message)
          setIsSuccess(true)
          setShowToast(true)
          navigate('/')
        }catch(err){
          // toast.error(err.response.data.message);
          setToastTitle('Nouveau mot de passe')
          setToastMessage(err.response.data.message)
          setIsSuccess(false)
          setShowToast(true)
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
            <input type="password" required ref={inputPassword1} name='nouveaumotdepasse' id='nouveaumotdepasse' value={user.nouveaumotdepasse} onChange={(e) => {handleChangeInput(e)}} />
            <span></span>
            <label>Nouveau mot de passe</label>
            {
                showEye1 ? <FaEye className='icon-eye' onClick={handleClickIconEye1} /> :  <FaEyeSlash className='icon-eye' onClick={handleClickIconEye1} />
            }
        </div>
            <div className="input-container">
            <input type="password" required ref={inputPassword2} name='confirmernouveaumotdepasse' id='confirmernouveaumotdepasse' value={user.confirmernouveaumotdepasse} onChange={(e) => {handleChangeInput(e)}} />
            <span></span>
            <label>Confirmation mot de passe</label>
            {
                showEye2 ? <FaEye className='icon-eye' onClick={handleClickIconEye2} /> :  <FaEyeSlash className='icon-eye' onClick={handleClickIconEye2} />
            }
        </div>
          
        <button className='btn-login d-flex align-items-center justify-content-center' type="button"  onClick={(e) => {handleSubmit(e, user)}}><FaCheck className='icon-btn' />Valider</button>
        </form>
    </div>
  </div>
  )
}

export default NewPassword
