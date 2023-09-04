import React, {useState} from 'react';
import { FaCheck } from 'react-icons/fa';
import Axios from 'axios';
import useCustomeContext from '../../Context/useCustomeContext';

const FormEnfant = (props) => {

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

    const [enfant, setEnfant] = useState({
        matriculeAgent: props.matricule,
        nomEnfant : '',
        sexeEnfant : 'Masculin',
        dateNaissEnfant : '',
    }); 

    const handleChangeEnfant = (e) => {
        setEnfant({...enfant, [e.target.id] : e.target.value}); 
    };

    const enregistrerEnfant = async (data) => {
        try{
            const reponse = await Axios.post("http://localhost:3001/enfant/ajoutEnfant", data);
            setToastTitle('Enregistrement enfant')
            setToastMessage(reponse.data.message)
            setIsSuccess(true)
            setShowToast(true)
        }catch(err){
            setToastTitle('Enregistrement enfant')
            setToastMessage(err.response.data.message)
            setIsSuccess(false)
            setShowToast(true)
        }
      }

    return (
        <>
        <div className="info2-enfant mb-2">
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-1">
                <label htmlFor="matriculeAgent" className='label-input mb-1'>N° Matricule agent<span>*</span></label>
                <input type="text" id='matriculeAgent' name='matriculeAgent' className='text-input' placeholder="Num matricule" disabled  value={enfant.matriculeAgent} onChange={(e) => {handleChangeEnfant(e)}} />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-1">
                <label htmlFor="nomEnfant" className='label-input mb-1'>Nom et prenom de l'enfant<span className='etoiles'>*</span></label>
                <input type="text" id='nomEnfant' name='nomEnfant' value={enfant.nomEnfant}  className='text-input' placeholder="Nom et prenom de l'enfant" onChange={(e) => {handleChangeEnfant(e)}} />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-1">
                <label htmlFor="dateNaissEnfant" className='label-input mb-1'>Date de naissance<span className='etoiles'>*</span></label>
                <input type="date" id='dateNaissEnfant' name='dateNaissEnfant' value={enfant.dateNaissEnfant} className='text-input' placeholder='Date de naissance' onChange={(e) => {handleChangeEnfant(e)}} />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-1">
                <label htmlFor="sexeEnfant" className='label-input mb-1'>Sexe<span className='etoiles'>*</span></label>
                <select className='text-input' id='sexeEnfant' name='sexeEnfant' onChange={(e) => {handleChangeEnfant(e)}} value={enfant.sexeEnfant}>
                    <option value="Masculin">Masculin</option>
                    <option value="Feminin">Féminin</option>
                </select>
            </div>
           
        </div>
        <div className="col-12 d-flex justify-content-start mb-4">
            <button type='button' onClick={() => {enregistrerEnfant(enfant)}} className='btn btn-sm btn-success rounded-1 d-flex align-items-center me-2'><FaCheck className='me-1' /><span>Enregistrer</span></button>
        </div>
        </>
    )
}

export default FormEnfant;
