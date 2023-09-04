import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TitreBlock from '../TitreBlock/TitreBlock';
import FormModifAvancement from '../Formulaire/FormModifAvancement';
import Axios from 'axios';

const ModificationAvancement = () => {

    const [tabAncienAvancement, setTabAncienAvancement] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const params = useParams();
    
    useEffect(() => {

        const fetchData = async () => {
            const result = await Axios(
                `http://localhost:3001/avancement/afficherAvancementUser/${params.id}`
            );
            setTabAncienAvancement(result.data);
            setShowForm(true);
        }

        fetchData();
       
    }, [params.id]);

  

    return (

        <div className="container-fluid p-4 personnel" >
        <div className="row align-items-center">
            <TitreBlock titleItem="Modification avancement" />
            {
                showForm && (<FormModifAvancement aos="fade-up" aos_offset="100" matriculeAgent={tabAncienAvancement[0].MATRICULE_AGENT} tabAncienAvancement={tabAncienAvancement} />)
            }
            
        </div>
        </div> 

    )
}

export default ModificationAvancement;