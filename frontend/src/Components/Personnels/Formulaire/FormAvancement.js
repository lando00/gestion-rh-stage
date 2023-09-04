import React, { useState } from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";
import Axios from 'axios';
import useCustomeContext from '../../Context/useCustomeContext';

const FormAvancement = (props) => {

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

    const [avancement, setAvancement] = useState({
        matricule : props.matriculeAgent,
        corps : '',
        grade : '',
        grille : '',
        date_initial_grade : '',
        date_initial_grille : '',
        date_expiration_grade : '',
        date_expiration_grille : '',
      });

      const handleChangeAvancement = (e) => {
        setAvancement({...avancement, [e.target.id] : e.target.value});
      }
      
      const enregistrerAvancement = async (data) => {
          try{
            const reponse = await Axios.post("http://localhost:3001/avancement/insertAvancement", data);
            setToastTitle('Modification avancement')
            setToastMessage(reponse.data.message)
            setIsSuccess(true)
            setShowToast(true)
        }catch(err){
            setToastTitle('Modification avancement')
            setToastMessage(err.response.data.message)
            setIsSuccess(false)
            setShowToast(true)
        }
      }

  return (
    <>
    <div className="info2 mb-2">
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
        <label htmlFor="matricule" className='label-input mb-1'>N° Matricule agent<span>*</span></label>
        <input type="text" id='matricule' name='matricule' value={avancement.matricule} onChange={(e)=>{handleChangeAvancement(e)}} className='text-input' placeholder="Num matricule" disabled/>
    </div>
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
        <label htmlFor="corps" className='label-input mb-1'>Corps<span>*</span></label>
        <input type="text" id='corps' name='corps' value={avancement.corps} onChange={(e)=>{handleChangeAvancement(e)}} className='text-input' placeholder="Corps" />
    </div>
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
        <label htmlFor="grade" className='label-input mb-1'>Grades<span>*</span></label>
        <input type="text" id='grade' name='grade' value={avancement.grade} onChange={(e)=>{handleChangeAvancement(e)}} className='text-input' placeholder="Grades" />
    </div>
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
        <label htmlFor="date_initial_grade" className='label-input mb-1'>Date initial grade<span>*</span></label>
        <input type="date" id='date_initial_grade' name='date_initial_grade' value={avancement.date_initial_grade} onChange={(e)=>{handleChangeAvancement(e)}} className='text-input' />
    </div>
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
        <label htmlFor="date_expiration_grade" className='label-input mb-1'>Date expiraton grade<span>*</span></label>
        <input type="date" id='date_expiration_grade' name='date_expiration_grade' value={avancement.date_expiration_grade} onChange={(e)=>{handleChangeAvancement(e)}} className='text-input' />
    </div>
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
        <label htmlFor="grille" className='label-input mb-1'>Grilles<span>*</span></label>
        <input type="text" id='grille' name='grille' value={avancement.grille} onChange={(e)=>{handleChangeAvancement(e)}} className='text-input' placeholder="Grilles" />
    </div>
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
        <label htmlFor="date_initial_grille" className='label-input mb-1'>Date initial grille<span>*</span></label>
        <input type="date" id='date_initial_grille' name='date_initial_grille' value={avancement.date_initial_grille} onChange={(e)=>{handleChangeAvancement(e)}} className='text-input' />
    </div>
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
        <label htmlFor="date_expiration_grille" className='label-input mb-1'>Date expiraton grille<span>*</span></label>
        <input type="date" id='date_expiration_grille' name='date_expiration_grille' value={avancement.date_expiration_grille} onChange={(e)=>{handleChangeAvancement(e)}} className='text-input' />
    </div>
</div>

<div className="col-12 d-flex justify-content-start mb-4">
    <button type='button' onClick={()=>{enregistrerAvancement(avancement)}} className='btn btn-sm btn-success rounded-1 d-flex align-items-center me-2'><FaCheck className='me-1' /><span>Enregistrer</span></button>
    <button type='button' onClick={()=>{props.setTabNouveauAvancement([])}} className='btn btn-sm btn-danger rounded-1 d-flex align-items-center me-2'><FaTimes className='me-1' /><span>Annuler</span></button>
</div>
</>
  )
}

export default FormAvancement;
