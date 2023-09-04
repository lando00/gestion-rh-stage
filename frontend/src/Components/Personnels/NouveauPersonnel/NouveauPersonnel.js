import React from 'react';
import TitreBlock from '../TitreBlock/TitreBlock';
import Formulaire from '../Formulaire/Formulaire';

const NouveauPersonnel = () => {
  return (

    <div className="container-fluid p-4 personnel" >
      <div className="row align-items-center">
          <TitreBlock titleItem="Nouveau" />
          <Formulaire aos="fade-up" aos_offset="100" />
      </div>
    </div> 

  )
}

export default NouveauPersonnel
