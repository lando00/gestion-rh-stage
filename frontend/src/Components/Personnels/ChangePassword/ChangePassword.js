import React,{useState}  from 'react';
import TitreBlock from '../TitreBlock/TitreBlock';
import { TiArrowBack } from "react-icons/ti";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../../../Api/axios';
import useCustomeContext from '../../Context/useCustomeContext';


const ChangePassword = () => {

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

      const navigate = useNavigate();

    const [user, setUser] = useState({
        motdepasse : '',
        motdepasseconfirmer : '',
      });

      const handleSubmit = async (e, data) => {
        e.preventDefault();
        try{
          const reponse = await axios.post(`/authentification/changeMotDePasse/${Cookies.get('id_agent')}`, data);
          // toast.success(reponse.data.message);
          setToastTitle('Modification mot de passe')
            setToastMessage(reponse.data.message)
            setIsSuccess(true)
            setShowToast(true)
            navigate(`/mndpt/personnels/profile/${Cookies.get('id_agent')}`)

        }catch(err){
          console.log(err.response.data.message);
          setToastTitle('Modification mot de passe')
          setToastMessage(err.response.data.message)
          setIsSuccess(false)
          setShowToast(true)
       
        }
      }

      const handleChangeInput = (e) => {
        setUser({...user, [e.target.id] : e.target.value}); 
      };

  return (
    <div className='col-12'>
        <TitreBlock titleItem="Compte"/>
        <div className="form-container">
            <div className="info-epoux">
                <span>Changer mot de passe</span>
                <hr />
            </div>
            <div className="row d-flex justify-content-center">
                <table className='col-6 my-2'>
                    <tr> 
                        <td><label className='label-input mb-3' htmlFor='motdepasse'>Mot de passe : </label></td>
                        <td><input type="password" className='w-100 text-input mb-3' onChange={(e)=>{handleChangeInput(e)}} id='motdepasse' name='motdepasse' placeholder='Mot de passe'/></td>
                    </tr>
                    <tr> 
                        <td><label className='label-input mb-3' htmlFor='motdepasseconfirmer'>Confirmation mot de passe : </label></td>
                        <td><input type="password" className='w-100 text-input mb-3' onChange={(e)=>{handleChangeInput(e)}} id='motdepasseconfirmer' name='motdepasseconfirmer' placeholder='Répétez le mot de passe'/></td>
                    </tr>
                </table>
                <div className='d-flex justify-content-center'>
                    <button type='button' className='btn btn-success btn-sm rounded-pill me-2' onClick={(e) => {handleSubmit(e, user)}}>Créer le compte</button>
                    <Link to={`/mndpt/personnels/profile/${Cookies.get('id_agent')}`} className='text-decoration-none'>
                        <button type='button' className='btn btn-sm btn-danger rounded-pill d-flex align-items-center'><TiArrowBack className="me-1"/>Retour</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangePassword
