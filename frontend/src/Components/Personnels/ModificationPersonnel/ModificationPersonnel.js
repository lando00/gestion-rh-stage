import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TitreBlock from '../TitreBlock/TitreBlock';
import FormulaireModification from '../Formulaire/FormulaireModification';
import Axios from 'axios';


const ModificationPersonnel = () => {
    const params = useParams();
    const [personnel, setPersonnel] = useState({});
    const [enfants, setEnfants] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            const result = await Axios(
                `http://localhost:3001/agent/afficherAgent/${params.id}`
            );
            
            setPersonnel(result.data[0]);
            fetchDataEnfants();
            setShowForm(true);
        }

        const fetchDataEnfants = async () => {
            const result = await Axios(
                `http://localhost:3001/agent/afficherAgent/enfant/${personnel.IM}`
            );
            setEnfants(result.data);
        }

        fetchData();
       
    }, [params.id, personnel.IM]);

  return (

    <div className="container-fluid p-4 personnel" >
      <div className="row align-items-center">
          <TitreBlock titleItem="Modification" />
          {
            showForm && (<FormulaireModification aos="fade-up" aos_offset="100" personnel={personnel} enfants={enfants} />)
          }
          
      </div>
    </div> 

  )
}

export default ModificationPersonnel;