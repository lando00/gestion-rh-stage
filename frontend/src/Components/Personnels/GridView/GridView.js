import React from 'react';
import CardPersonnel from '../CardPersonnel/CardPersonnel';


const GridView = ({listPersonnel}) => {
  
  return (
    <div className="row my-3">
        {
          listPersonnel.map((personnel) => 
            <CardPersonnel aos="zoom-in" aos_offset="100" id={personnel.ID_AGENT} matricule={personnel.IM} nom={personnel.PRENOMS} service={personnel.SERVICE} image={personnel.PHOTO} />
          )
        }
    </div>
  )
}

export default GridView;
