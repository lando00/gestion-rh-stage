import React, { useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TitreBlock from '../TitreBlock/TitreBlock';
import { FaFilePdf } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import './ProfilePersonnel.css';
import { useReactToPrint } from 'react-to-print';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { BiLockAlt } from 'react-icons/bi'

const ProfilePersonnel = (props) => {
    
    const pdf = useRef(null);
    const handlePrint = useReactToPrint({
        content : () => pdf.current,
        documentTitle : 'emp-data',
    });

    const params = useParams();
    const [personnel, setPersonnel] = useState({});
    const [enfants, setEnfants] = useState([]);
    const [avancement, setAvancement] = useState([]);
    
    useEffect(() => {

        const fetchData = async () => {
            const result = await Axios(
                `http://localhost:3001/agent/afficherAgent/${params.id}`
            );
            
            setPersonnel(result.data[0]);
            fetchDataEnfants();
            fetchDataAvancement();
        }

        const fetchDataEnfants = async () => {
            const result = await Axios(
                `http://localhost:3001/agent/afficherAgent/enfant/${personnel.IM}`
            );

            setEnfants(result.data);
        }

        const fetchDataAvancement = async () => {
            const result = await Axios(
                `http://localhost:3001/avancement/afficherAvancementUser/${personnel.IM}`
            );

            setAvancement(result.data);
            
        }

        fetchData();
        

    }, [params.id, personnel.IM]);

    
  return (
    <div className="container-fluid p-4 personnel" >
        <div className='col-12'>
            <TitreBlock titleItem="Profile" />

            <div className='form-container px-5' ref={pdf} data-aos={props.aos} data-aos-offset={props.aos_offset}>
                <div className="info-epoux">
                    <span>Informations agents</span>
                    <hr />
                </div>
                <div className="col-12 d-flex my-4 d-flex justify-content-center" >
                    <div className="col-5">
                        <div className="photo-personnel text-center d-flex justify-content-end">
                            <img src={personnel.PHOTO} alt="" />
                        </div> 
                    </div>
                    <div className="col-7">
                        <table className="table-info-agent">
                            <tr>
                                <td className='label-container h6'>Nom Complet : </td>
                                <td className='px-3'><span>{personnel.NOM} {personnel.PRENOMS}</span></td>
                            </tr>

                            <tr>
                                <td className='label-container h6'>N° Matricule : </td>
                                <td><span className='px-3'>{personnel.IM}</span></td>
                            </tr>

                            <tr>
                                <td className='label-container h6'>Fonction : </td>
                                <td className='px-3'>{personnel.FONCTION}</td>
                            </tr>

                            <tr>
                                <td className='label-container h6'>Service : </td>
                                <td className='px-3'>{personnel.SERVICE}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="col-12 d-flex flex-wrap mb-3">
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Sexe : </span><br />
                        <span>{personnel.SEXE}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Date de naissance : </span><br />
                        <span>{new Date(personnel.DATE_NAISS).toLocaleDateString()}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Lieu de naissance : </span><br />
                        <span>{personnel.LIEU_NAISS}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Adresse : </span><br />
                        <span>{personnel.ADRESSE}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Adresse urgent : </span><br />
                        <span>{personnel.ADRESSE_URGENT}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Téléphone : </span><br />
                        <span>{personnel.TELEPHONE}</span>
                    </div>

                    {
                        (Cookies.get('matricule').toString().toLocaleLowerCase() === personnel.IM) && (

                            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                                <span className='h6'>CIN : </span><br />
                                <span>{personnel.CIN}</span>
                            </div>

                        )
                    }
                    
                   



                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Date CIN : </span><br />
                        <span>{new Date(personnel.DATE_CIN).toLocaleDateString()}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Lieu CIN : </span><br />
                        <span>{personnel.LIEU_CIN}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Indice : </span><br />
                        <span>{personnel.INDICE}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Situation Matrimoniale : </span><br />
                        <span>{personnel.ETAT_MATRIMONIAL}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Nombre d'enfant : </span><br />
                        <span>{personnel.NOMBRE_ENFANT}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Nombre d'enfant en charge: </span><br />
                        <span>{personnel.NOMBRE_ENFANT_CHARGE}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Père : </span><br />
                        <span>{personnel.PERE_AGENT}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Mère : </span><br />
                        <span>{personnel.MERE_AGENT}</span>
                    </div>
                     <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Date d'entree : </span><br />
                        <span>{new Date(personnel.DATE_ENTREE_ADMINISTRATION).toLocaleDateString()}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Lieu travail : </span><br />
                        <span>{personnel.LIEU_TRAVAIL}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Type agent : </span><br />
                        <span>{personnel.TYPE_AGENT}</span>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <span className='h6'>Statut présence : </span><br />
                        <span>{personnel.STATUT_PRESENCE}</span>
                    </div>
                    {
                        personnel.APTITUDE_SPECIAL !== '' && (
                            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                                <span className='h6'>Aptitude spéciale : </span><br />
                                <span>{personnel.APTITUDE_SPECIAL}</span>
                            </div>
                        )
                    }
                    
                    {
                        personnel.DISTINCTION_HONORIFIQUE !== '' && (
                            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                                <span className='h6'>Distinction honorifique : </span><br />
                                <span>{personnel.DISTINCTION_HONORIFIQUE}</span>
                            </div>
                        )
                    }
                    
                </div>
                {
                    personnel.EPOUX_SE_ && (
                        <>
                            <div className="info-epoux">
                                <span>Informations époux</span>
                                <hr />
                            </div>
                            <div className="col-12 d-flex flex-wrap mb-4">
                                <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 ">
                                    <span className='h6'>Nom époux : </span><br />
                                    <span>{personnel.EPOUX_SE_}</span>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 ">
                                    <span className='h6'>Père époux : </span><br />
                                    <span>{personnel.PERE_EPOUX_SE_}</span>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 ">
                                    <span className='h6'>Mère époux : </span><br />
                                    <span>{personnel.MERE_EPOUX_SE_}</span>
                                </div>
                            </div>
                        </>
                    ) 
                }
                

                {
                    enfants.length > 0 &&(
                        <>
                        <div className="info-epoux">
                            <span>Informations enfants</span>
                            <hr />
                        </div>

                        {

                            enfants.map(enfant => 

                                (<div className="col-12 d-flex flex-wrap mb-3">
                                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 ">
                                        <span className='h6'>Nom enfant : </span><br />
                                        <span>{enfant.NOM_ENFANT}</span>
                                    </div>
                                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 ">
                                        <span className='h6'>Date de naissance : </span><br />
                                        <span>{new Date(enfant.DATE_NAISS_ENFANT).toLocaleDateString()}</span>
                                    </div>
                                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 ">
                                        <span className='h6'>Sexe : </span><br />
                                        <span>{enfant.SEXE_ENFANT}</span>
                                    </div>
                                </div>)
                        
                            )

                        }

                        </>
                    )
                }

                

                
               

                <div className="info-epoux">
                    <span>Avancement de l'agent</span>
                    <hr />
                </div>
                <div className="col-12">
                    <table className="table custom-table-avancement bg-white mb-4">
        
                        <thead className='text-center'>
                            <tr>
                                <th className='h6' scope="col">Dates</th>
                                <th className='h6' scope="col">Corps</th>
                                <th className='h6' scope="col">Grade</th>
                                <th className='h6' scope="col">Grille</th> 
                            </tr>
                            
                        </thead>
                        <tbody className='text-center'>
                            
                                {
                                    avancement.map(av => (
                                        <tr>
                                            <th scope="col" className='h6'>{new Date(av.DATE_INITIAL_GRADE).toLocaleDateString()}</th>
                                            <td scope="col">{av.CORPS}</td>
                                            <td scope="col">{av.GRADE}</td>
                                            <td scope="col">{av.GRILLE}</td>
                                        </tr>
                                    ))
                                }

                            
                        </tbody>
                    </table>
                </div>
                
                <div className="col-12 d-flex">
                    <button type='button' className='btn btn-sm btn-success rounded-pill d-flex align-items-center' onClick={handlePrint}><FaFilePdf className="me-1" />Exporter en pdf</button>
                    <Link to="/mndpt/personnel" type='button' className='btn btn-sm btn-danger rounded-pill d-flex align-items-center mx-2'><TiArrowBack className="me-1"/>Retour</Link>
                    {
                        (Cookies.get('matricule').toString().toLocaleLowerCase() === personnel.IM) &&<Link to="/mndpt/personnels/modifier_pwd" type='button' className='btn btn-sm btn-warning text-white ms-auto rounded-pill d-flex align-items-center mx-2'><BiLockAlt className="me-1"/>Changer mot de passe</Link>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePersonnel;
