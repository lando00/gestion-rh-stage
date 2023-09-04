import React from 'react';
import { Link } from 'react-router-dom';
import './CardPersonnel.css';
import Cookies from 'js-cookie';
import { FiEdit } from 'react-icons/fi';


const CardPersonnel = props => {

  return (
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3" data-aos={props.aos} data-aos-offset={props.aos_offset}>
        <div className="profile-widget" >
            <span className="text-muted edit-icon">
                <Link className='text-muted' title='Editer' to={`/mndpt/personnels/modifier/${props.id}`}>
                {
                    ((Cookies.get('type').toLocaleLowerCase() === 'superadmin') || (Cookies.get('type').toLocaleLowerCase() === 'admin')) && <FiEdit />
                }
                {/* {
                    (Cookies.get('type').toLocaleLowerCase() !== 'superadmin' && props.matricule === Cookies.get('matricule')) && <FiEdit />
                } */}
                </Link> 
            </span>
            <div className="profile-img">
                <span className="avatar">
                    <img src={props.image} alt="avatar" />
                </span>
            </div>
            <h5 className="user-name m-t-10 mb-0 text-ellipsis ">
                <span className="text-black h5 text-decoration-none">{props.nom}</span>
            </h5>
            <div className="small text-muted">{props.service?.toUpperCase()}</div>
            {/* {
                (props.matricule === Cookies.get('matricule') && Cookies.get('type') !== 'Admin') && <Link to={`/mndpt/personnels/profile/${props.id}`} className='btn btn-outline-success btn-sm m-t-10 rounded-pill'>Voir Profile</Link>
            } */}

            {
                ((Cookies.get('type').toLocaleLowerCase() === 'superadmin') || (Cookies.get('type').toLocaleLowerCase() === 'admin')) && <Link to={`/mndpt/personnels/profile/${props.id}`} className='btn btn-outline-success btn-sm m-t-10 rounded-pill'>Voir Profile</Link>
            }
            
        </div>
    </div>
  )
}

export default CardPersonnel;
