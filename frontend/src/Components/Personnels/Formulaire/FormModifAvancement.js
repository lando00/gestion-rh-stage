import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";
import FormAvancement from './FormAvancement';
import FormAvancement2 from './FormAvancement2';
import './Formulaire.css';
import useCustomeContext from '../../Context/useCustomeContext';


const FormModifAvancement = (props) => {


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

  const [tabNouveauAvancement, setTabNouveauAvancement] = useState([]);
  
  

  const handleClickNouveau = () => {
    setTabNouveauAvancement(() => {
        return [<FormAvancement setTabNouveauAvancement={setTabNouveauAvancement} matriculeAgent={props.matriculeAgent} />]
      })
  }


  return (
    <div className="col-12">
        <form className='form-container'  data-aos={props.aos} data-aos-offset={props.aos_offset}>
        
        <div className="info-epoux">
            <span>Avancement</span>
            <hr />
        </div>

        {
            props.tabAncienAvancement.map(param => <FormAvancement2 avancement={param} />)
        }
            
        {
            tabNouveauAvancement.map(param => param)
        }

        <div className="info-epoux d-flex justify-content-end">
            <button type='button' onClick={handleClickNouveau} className='me-2 btn btn-sm btn-warning text-white rounded-1 d-flex align-items-center'><FaPlus className='me-1' />Nouveau </button>
            <Link to={`/mndpt/personnel`} type='button' className='btn btn-sm btn-danger rounded-1 d-flex align-items-center'><TiArrowBack className='me-1' />Retour</Link>
        </div>
            
        </form>
    </div>
  )
}

export default FormModifAvancement;
