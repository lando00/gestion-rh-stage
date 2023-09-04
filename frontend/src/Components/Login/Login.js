import React, { useState, Fragment, useRef, useEffect } from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { MdQrCodeScanner } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/img/logo_mndpt.png';
import Cookies from 'js-cookie';
import Scanner from '../QRCode/Scanner';
import axios from '../../Api/axios';
import useCustomeContext from '../Context/useCustomeContext';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {

  // context personnalisE
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

  //recuperer les informations necessaires sur tous les personnels
  useEffect(() => {
    const fecthData = async () => {
        try{
            const informations = await axios('/personnel/liste')
            setInfoPersonnel(informations.data)
        }
        catch(error){
            console.log(error)
        }
    }
    fecthData();
    console.log(infoPersonnel)
}, [])


  // clean des anciens Cookies
  Cookies.remove('username');
  Cookies.remove("service");
  Cookies.remove("role");
  Cookies.remove("matricule");

  // les champs username et password
  const [showEye, setShowEye] = useState(true);
  const inputPassword = useRef(null);
  const [user, setUser] = useState({
    user : '',
    motdepasse : '',
  });
  const handleChangeInput = (e) => {
    setUser({...user, [e.target.id] : e.target.value}); 
  };

  // afficher ou cacher le mot de passe
  const handleClickIconEye = () => {

      setShowEye(!showEye);
      showEye
        ? inputPassword.current.attributes[0].nodeValue = 'text'
        : inputPassword.current.attributes[0].nodeValue = 'password';
  }

  // les variables de navigation
  const navigate = useNavigate()
  const location = useLocation()


  const handleSubmit = async (e, data) => {
    e.preventDefault();
    setUser({
      user: '',
      motdepasse: ''
    })
    const show=(fe)=>{
      console.log(fe?.response?.data?.message)
      setToastMessage(fe.response?.data?.message)
      setToastTitle('Erreur de la connexion')
      setIsSuccess(false)
      setShowToast(true)
    }
    try{
      const reponse = await axios.post("http://localhost:3001/authentification/login", data);
      Cookies.set('matricule', reponse.data.session[0].MATRICULE_AGENT);
      Cookies.set('username', reponse.data.session[0].USER);
      Cookies.set('service', reponse.data.session[0].SERVICE);
      Cookies.set('prenoms', reponse.data.session[0].PRENOMS);
      Cookies.set('type', reponse.data.session[0].TYPE_AGENT);
      Cookies.set('role', reponse.data.session[0].TYPE_AGENT);
      Cookies.set('photo', reponse.data.session[0].PHOTO);
      Cookies.set('id_agent',reponse.data.session[0].ID_AGENT);
      Cookies.set('statut', reponse.data.session[0].STATUT_PRESENCE)

      if(reponse.data.message !== ''){
        toast.warning(reponse.data.message, {autoClose: false});
      }

      const utilisateur = Cookies.get("role").toLocaleLowerCase()
      const from = 
      location?.state?.from?.pathname
        ? location.state.from.pathname
        : utilisateur === 'utilisateur'
          ? "/mndpt/pointage"
          :"/mndpt/dashboard"

            setToastTitle(Cookies.get('username'))
            setToastMessage("connexion reussie")
            setIsSuccess(true)
            setShowToast(true)

        navigate(from, {replace: true})
    }catch(err){
      if(err.response){
       show(err)
      }
      else if (err.request) {
        console.log( err.request);
        } 
      else {
      console.log('Error', err.message);
      }
    }
  }

  return (
    <Fragment>
      <div className='login-container'>
        <div className="login">

            <div className="logo">
              <img src={Logo} alt="" />
            </div>

            <form onSubmit={(e) => {handleSubmit(e, user)}}>

              <div className="input-container">
                <input type="text" required={true} name='user' id='user' value={user.user} onChange={(e) => {handleChangeInput(e)}}/>
                <span></span>
                <label>Nom d'utilisateur</label>
              </div>

              <div className="input-container">
                <input type="password" required={true} ref={inputPassword} name='motdepasse' id='motdepasse' value={user.motdepasse} onChange={(e) => {handleChangeInput(e)}}/>
                <span></span>
                <label>Mot de passe</label>
                {
                  showEye ? <FaEye className='icon-eye' onClick={handleClickIconEye} /> :  <FaEyeSlash className='icon-eye' onClick={handleClickIconEye} />
                }
              </div>

              <div className='link'>
                <a href='/forgotpass' className="link-forgot">Mot de passe oublié ?</a>
                <a href="/signup" className="link-signup">Créer un compte</a>
              </div>

              <button  type="submit" className=' btn-login d-flex align-items-center justify-content-center'><FiLogIn  className='icon-btn' /> Se connecter</button>
            </form>

        </div>
      </div>

      <Scanner />

      <button
        className='btn-scannre'
        onClick={
          () => {
            setShowScanner(true)
            setStopScan(false)
          }
        }

        style={{
          boxSizing: 'border-box',
          width:'60px',
          height: '60px',
          borderRadius: '35px',
          border: 'none',
          fontSize: '30px',
          color: 'white',
          background: '#4AAE88',
          lineHeight: '0px',
          position: 'absolute',
          bottom: 20,
          right: 30,
          padding: '0px',
          boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)'
          }}
      >

        <MdQrCodeScanner />
      </button>

    </Fragment>
  )
}

export default Login;