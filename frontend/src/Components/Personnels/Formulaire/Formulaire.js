import React, { useState } from 'react';
import Photo from '../../../logo/p.png'
import { FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";
import FormEnfant from './FormEnfant';
import Axios from 'axios';
import './Formulaire.css';
import { toast } from 'react-toastify';
import useCustomeContext from '../../Context/useCustomeContext';


const FormAjoutAgent = (props) => {

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

  const [agent, setAgent] = useState({

    im : '',
    nom : '',
    prenoms : '',
    sexe : 'Masculin',
    datenaiss : '',
    lieunaiss : '',
    adresse : '',
    cin : '',
    datecin : '',
    lieucin : '',
    indice : '',
    dateadministration : '',
    lieutravail : '',
    tel : '',
    etatmatrimonial : 'Célibataire',
    adresseurgent : '',
    aptitudespecial : '',
    distictionhonorifique : '',
    nb_enfant : 0,
    nb_enfant_charge : 0,
    pere : '',
    mere : '',
    type_service : 'Techniques',
    epoux_se : '',
    pereEpoux_se : '',
    mereEpoux_se : '',
    fonction : '',
    photo : '',
    type_agent: 'Utilisateur',
    statut_presence : 'En fonction',

  });

  const [suivi, setSuivi] = useState({

    matricule : '',
    diplome : 'CEPE',
    categorie : 'Categorie 1',
    mention : ''

  });

  const [avancement, setAvancement] = useState({
    matricule : '',
    corps : '',
    grade : '',
    grille : '',
    date_initial_grade : '',
    date_initial_grille : '',
    date_expiration_grade : '',
    date_expiration_grille : '',
  });

  const [tabInfoEnfants, setTabInfoEnfants] = useState([]);

  const handleChange = (e) => {
    setAgent({...agent, [e.target.id] : e.target.value});
    if(e.target.id === 'im'){
        setSuivi({...suivi, ['matricule'] : e.target.value});
        setAvancement({...avancement, ['matricule'] : e.target.value});
    }
    if(e.target.id === 'nb_enfant'){
      let i = 0;
      setTabInfoEnfants([]);
      while(i < e.target.value) {
        setTabInfoEnfants((prevState) => {
          return [...prevState, <FormEnfant matricule={agent.im} />]
        })
        i++;
      }
    }
  };

  const handleChangeSuivi = (e) => {
    setSuivi({...suivi, [e.target.id] : e.target.value});
  };

  const handleChangeAvancement = (e) => {
    setAvancement({...avancement, [e.target.id] : e.target.value});
  }

    
  const uploadImage = (image) => {
    let formData = new FormData();

    formData.append("image", image);

    fetch("http://localhost:3001/upload", {
        method: "post",
        body: formData,
    })
        .then((res) => res.json())
        .then((resBody) => {
            setAgent({...agent, photo : resBody.profile_url});
        });

  }


  const [image2, setImage2] = useState(Photo);

  const imageHandler = (e) => {

    // setImage(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
        setImage2(reader.result)
    }
    reader.readAsDataURL(e.target.files[0]);

    uploadImage(e.target.files[0]);
    
  }

  

  const enregistrerAgent = async () => {
    try{
        const reponse = await Axios.post("http://localhost:3001/agent/creerAgent", agent);
        
        setToastTitle('Enregistrement agent')
        setToastMessage(reponse.data.message)
        setIsSuccess(true)
        setShowToast(true)
    }catch(err){
        setToastTitle('Enregistrement agent')
        setToastMessage(err.response.data.message)
        setIsSuccess(false)
        setShowToast(true)
    }
    
  }
  
  const enregistrerSuivi = async (data) => {
      try{
        const reponse = await Axios.post("http://localhost:3001/suivi/insertSuivi", data);
        
        setToastTitle('Enregistrement suivi')
        setToastMessage(reponse.data.message)
        setIsSuccess(true)
        setShowToast(true)
    }catch(err){
    
        setToastTitle('Enregistrement suivi')
        setToastMessage(err.response.data.message)
        setIsSuccess(false)
        setShowToast(true)
    }
  }

  const enregistrerAvancement = async (data) => {
      try{
        const reponse = await Axios.post("http://localhost:3001/avancement/insertAvancement", data);
        setToastTitle('Enregistrement avancement')
        setToastMessage(reponse.data.message)
        setIsSuccess(true)
        setShowToast(true)
    }catch(err){
        setToastTitle('Enregistrement avancement')
        setToastMessage(err.response.data.message)
        setIsSuccess(false)
        setShowToast(true)
    }
  }

  return (
    <div className="col-12">
        <form className='form-container'  data-aos={props.aos} data-aos-offset={props.aos_offset}>
        <div className="info-epoux">
        <span>Informations agents</span>
        <hr />
        </div>
        <div className="info1">
            <div className="photo-container">
            <div className="photo">
                <img src={image2} alt="" />
            </div>
            <input type="file" name='image' placeholder='Photo'  className="custom-file-input" onChange={(e)=>imageHandler(e)} />
            
            </div>
            <div className="info-agent">
                <table className="table-info-agent">
                <tr>
                    <td><label htmlFor="im" className='label-input'>N° Matricule<span>*</span></label></td>
                    <td><input type="text" className='text-input' id='im' name="im" value={agent.im} placeholder="Numero matricule" onChange={(e) => { handleChange(e) }} /></td>
                </tr>

                <tr>
                    <td> <label htmlFor="nom" className='label-input'>Nom<span>*</span> </label></td>
                    <td><input type="text" className='text-input' id='nom' name="nom" onChange={(e) => { handleChange(e) }} value={agent.nom} placeholder="Nom de l'agent" /></td>
                </tr>

                <tr>
                    <td><label htmlFor="prenoms" className='label-input'>Prénom(s) </label></td>
                    <td><input type="text" id='prenoms' className='text-input' onChange={(e) => { handleChange(e) }} placeholder="Prénom de l'agent" name="prenoms" value={agent.prenoms} /></td>
                </tr>

                <tr>
                    <td> <label htmlFor="sexe" className='label-input'>Sexe<span>*</span> </label></td>
                    <td>
                    <select className='text-input' id='sexe' name="sexe" value={agent.sexe} onChange={(e) => { handleChange(e) }}>
                        <option value="Masculin">Masculin</option>
                        <option value="Feminin">Féminin</option>
                    </select>
                    </td>
                </tr>
                </table>
    
            </div>
        </div>
        <div className="info2 mb-2">
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="datenaiss" className='label-input mb-1'>Date de naissance<span>*</span></label>
                <input type="date" id='datenaiss' name="datenaiss" onChange={(e) => { handleChange(e) }} value={agent.datenaiss} className='text-input' />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="lieunaiss" className='label-input mb-1'>Lieu de naissance<span>*</span></label>
                <input type="text" id='lieunaiss' name="lieunaiss" onChange={(e) => { handleChange(e) }} value={agent.lieunaiss} className='text-input' placeholder='Lieu de naissance' />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="adresse" className='label-input mb-1'>Adresse<span>*</span></label>
                <input type="text" id='adresse' name="adresse" onChange={(e) => { handleChange(e) }} value={agent.adresse} className='text-input' placeholder="Adresse de l'agent" />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="tel" className='label-input mb-1'>Téléphone<span>*</span></label>
                <input type="text" id='tel' name='tel' value={agent.tel} onChange={(e) => { handleChange(e) }} className='text-input' placeholder='Num téléphone'  />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="cin" className='label-input mb-1'>CIN<span>*</span></label>
                <input type="text" id='cin' name="cin" value={agent.cin} onChange={(e) => { handleChange(e) }} className='text-input' placeholder='Num CIN' />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="datecin" className='label-input mb-1'>Date CIN<span>*</span></label>
                <input type="date" id='datecin' name="datecin" value={agent.datecin} onChange={(e) => { handleChange(e) }} className='text-input' />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="lieucin" className='label-input mb-1'>Lieu CIN<span>*</span></label>
                <input type="text" id='lieucin' name="lieucin" value={agent.lieucin} onChange={(e) => { handleChange(e) }} className='text-input' placeholder='Lieu CIN' />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="dateadministration" className='label-input mb-1'>Date d'entrée<span>*</span></label>
                <input type="date" id='dateadministration' className='text-input' onChange={(e) => { handleChange(e) }} name='dateadministration' value={agent.dateadministration} />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="type_service" className='label-input mb-1'>Services<span>*</span></label>
                <select className='text-input p-0' id='type_service' name='type_service' onChange={(e) => { handleChange(e) }} value={agent.type_service}>
                    <option value="Techniques">Techniques</option>
                    <option value="Rélation Direct avec BC">Relation Direct avec le Bureau Centrale</option>
                    <option value="Bureau Régional">Bureau Régional</option>
                    <option value="Antenne Régional d'IH">Antenne Régional d'Ihorombe</option>
                </select>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="fonction" className='label-input mb-1'>Fonction<span>*</span></label>
                <input type="text" id='fonction' name="fonction" value={agent.fonction} onChange={(e) => { handleChange(e) }} className='text-input' placeholder="Fonction de l'agent" />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
            <label htmlFor="type_agent" className='label-input mb-1'>Type agent<span>*</span></label>
                <select className='text-input p-0' id='type_agent' name='type_agent' onChange={(e) => { handleChange(e) }} value={agent.type_agent}>
                    <option value="Utilisateur">Utilisateur</option>
                    <option value="Admin">Admin</option>
                    <option value="Superadmin">Superadmin</option>
                </select>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="lieutravail" className='label-input mb-1'>Lieu de travail<span>*</span></label>
                <input type="text" id='lieutravail' name='lieutravail' value={agent.lieutravail} onChange={(e) => { handleChange(e) }} className='text-input' placeholder="Lieu de travail" />
            </div> 
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="indice" className='label-input mb-1'>Indice<span>*</span></label>
                <input type="text" id='indice' name='indice' value={agent.indice} onChange={(e) => { handleChange(e) }} className='text-input' placeholder="Indice de l'agent" />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
            <label htmlFor="statut_presence" className='label-input mb-1'>Statut présence<span>*</span></label>
                <select className='text-input p-0' id='statut_presence' name='statut_presence' onChange={(e) => { handleChange(e) }} value={agent.statut_presence}>
                    <option value="En fonction">En fonction</option>
                    <option value="Congé">Congé</option>
                    <option value="Quitté">Quitté</option>
                </select>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="adresseurgent" className='label-input mb-1'>Adresse urgent</label>
                <input type="text" id='adresseurgent' name='adresseurgent' value={agent.adresseurgent} onChange={(e) => { handleChange(e) }} className='text-input' placeholder="Adresse urgent" />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="aptitudespecial" className='label-input mb-1'>Aptitude speciale</label>
                <input type="text" id='aptitudespecial' name='aptitudespecial' value={agent.aptitudespecial} onChange={(e) => { handleChange(e) }} className='text-input' placeholder="Aptitude speficiale" />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="distictionhonorifique" className='label-input mb-1'>Distinction honorifique</label>
                <input type="text" id='distictionhonorifique' name='distictionhonorifique' onChange={(e) => { handleChange(e) }} value={agent.distictionhonorifique} className='text-input' placeholder="Distinction honorifique" />
            </div>
            
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="nb_enfant" className='label-input mb-1'>Nombre d'enfant<span>*</span></label>
                <input type="number" id="nb_enfant" name='nb_enfant' className='text-input' onChange={(e) => { handleChange(e) }} value={agent.nb_enfant}  min="0" max="15" />
            </div>
             <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="nb_enfant_charge" className='label-input mb-1'>Nombre d'enfant en charge<span>*</span></label>
                <input type="number" id="nb_enfant_charge" name='nb_enfant_charge' className='text-input' onChange={(e) => { handleChange(e) }} value={agent.nb_enfant_charge}  min="0" max="15" />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="pere" className='label-input mb-1'>Père</label>
                <input type="text" id='pere'  name='pere' value={agent.pere} className='text-input' onChange={(e) => { handleChange(e) }} placeholder="Nom du Père" />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="mere" className='label-input mb-1'>Mère</label>
                <input type="text" id='mere' name='mere' value={agent.mere} className='text-input' onChange={(e) => { handleChange(e) }} placeholder="Nom du Mère" />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                <label htmlFor="etatmatrimonial" className='label-input mb-1'>Situation Matrimoniale<span>*</span></label>
                <select className='text-input' name='etatmatrimonial' value={agent.etatmatrimonial}  id='etatmatrimonial' onChange={(e) => { handleChange(e) }}>
                    <option value="Célibataire">Célibataire</option>
                    <option value="Marié">Marié</option>
                    <option value="Veuf/Veuve">Veuf/Veuve</option>
                </select>
            </div>

            { agent.etatmatrimonial === 'Marié' && 

            (
                <>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="epoux_se" className='label-input mb-1'>Nom époux<span>*</span></label>
                        <input type="text" id='epoux_se'  name="epoux_se" value={agent.epoux_se} onChange={(e) => { handleChange(e) }} className='text-input' placeholder="Nom époux" />
                    </div> 
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="pereEpoux_se" className='label-input mb-1'>Père époux</label>
                        <input type="text" id='pereEpoux_se' name='pereEpoux_se' value={agent.pereEpoux_se} onChange={(e) => { handleChange(e) }} className='text-input' placeholder="Nom père époux" />
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="mereEpoux_se" className='label-input mb-1'>Mère époux</label>
                        <input type="text" id='mereEpoux_se' name='mereEpoux_se' value={agent.mereEpoux_se} onChange={(e) => { handleChange(e) }} className='text-input' placeholder="Nom mère époux" />
                    </div>
                </>
            )}
 
        </div>

        <div className="col-12 d-flex justify-content-start mb-4">
            <button type='button' className='btn btn-sm btn-success rounded-1 d-flex align-items-center me-2' onClick={() => {enregistrerAgent()}} >
                <FaCheck className='me-1' />
                <span>Enregistrer</span>
            </button>
        </div>   

        { agent.nb_enfant > '0' && 

        (
            <>
            <div className="info-epoux">
            <span>Informations enfants</span>
            <hr />
            </div>
            {
                tabInfoEnfants.map(param => param)
            }
  
            
            
            </>
        )}

        <div className="info-epoux">
            <span>Suivi</span>
            <hr />
        </div>
        <div className="info2 mb-2">
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-1">
                <label htmlFor="matricule" className='label-input mb-1'>N° Matricule agent<span>*</span></label>
                <input type="text" id='matricule' name='matricule' value={suivi.matricule} disabled className='text-input' placeholder="Num matricule" onChange={(e) => { handleChangeSuivi(e) }} />
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-1">
                <label htmlFor="diplome" className='label-input mb-1'>Diplôme<span>*</span></label>
                <select className='text-input' id='diplome' name="diplome" value={agent.diplome} onChange={(e) => { handleChange(e) }}>
                    <option value="CEPE">CEPE</option>
                    <option value="BEPC">BEPC</option>
                    <option value="BACC">BACC</option>
                    <option value="DTS">DTS</option>
                    <option value="LICENCE">LICENCE</option>
                    <option value="MASTER">MASTER</option>
                    <option value="DOCTORAT">DOCTORAT</option>
            </select>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-1">
                <label htmlFor="categorie" className='label-input mb-1'>Catégorie</label>
                <select className='text-input' id='categorie' name="categorie" value={agent.categorie} onChange={(e) => { handleChange(e) }}>
                    <option value="Categorie 1">Categorie 1</option>
                    <option value="Categorie 2">Categorie 2</option>
                    <option value="Categorie 3">Categorie 3</option>
                    <option value="Categorie 4">Categorie 4</option>
                    <option value="Categorie 5">Categorie 5</option>
                    <option value="Categorie 6">Categorie 6</option>
                    <option value="Categorie 7">Categorie 7</option>
                
            </select>
            </div>
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mb-1">
                <label htmlFor="mention" className='label-input mb-1'>Mention</label>
                <input type="text" id='mention' name='mention' className='text-input' placeholder="Mention" onChange={(e) => { handleChangeSuivi(e) }} />
            </div>
            
        </div>

        <div className="col-12 d-flex justify-content-start mb-4">
            <button type='button' onClick={() => {enregistrerSuivi(suivi)}} className='btn btn-sm btn-success rounded-1 d-flex align-items-center me-2'><FaCheck className='me-1' /><span>Enregistrer</span></button>
        </div>
        
        <div className="info-epoux">
            <span>Avancement</span>
            <hr />
        </div>
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
        </div>

        <div className="info-epoux d-flex justify-content-end">
            <Link to="/mndpt/personnel" type='button' className='btn btn-sm btn-danger rounded-1 d-flex align-items-center'><TiArrowBack className='me-1' />Fin de l'inscription !</Link>
        </div>
            
        </form>
    </div>
  )
}

export default FormAjoutAgent;
