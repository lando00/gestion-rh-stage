import React, { useState, useEffect, useReducer } from 'react';
import { ImSearch } from 'react-icons/im'
import './Autorisation.css';
import NouvelleDemande from './NouvelleDemande';
import useCustomeContext from '../Context/useCustomeContext';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaRegUser, FaTimes } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoAdd } from 'react-icons/io5';
import Cookies from 'js-cookie';
import axios from '../../Api/axios';
import { BsCheck,BsInfoCircle } from 'react-icons/bs';
import { useLocation,Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';


const AUTORISATION_URL = "/autorisation/liste"
const DEMANDE_URL = "/demande_autorisation/liste"

function Autorisation() {
  
  const selecte_disable = Cookies.get("role").toLowerCase() !== "superadmin" ? true : false
  const {
    showToast, 
    setShowToast,
    isSuccess, 
    setIsSuccess,
    toastMessage, 
    setToastMessage,
    toastTitle,
    setToastTitle,
    isValidation, 
    setIsValidation,
    isModification,
    setIsModification,
    isNewDemande, 
    setIsNewDemande,
    modalshow,
     setModalshow ,
    debut,
    setDebut,
    fin,
    setFin,
    reprise,
    setReprise,
    listeservices, 
    setListeservices,
    reqdody, 
    setReqbody,
  } = useCustomeContext()

  const [listeAutorisation, setListeAutorisation] = useState([])
  const [listeDemande, setListeDemande] = useState([])
  const [filtreRecherche, setFiltreRecherche] = useState('')

  const [ useReducerValue, forceUpdate ] = useReducer(x=>x+1,0)
  
  // switch demande et autorisation
  const [isAutorisation, setIsAutorisation] = useState(false)
  const [isDemande, setIsDemande] = useState(true)

  // recuperaton des donnees
  useEffect(() => {
    const fetchData = async _=> {
      try{
        const reponse = await axios.get(AUTORISATION_URL)
        setListeAutorisation(reponse.data)
      }
      catch(error){
        setListeAutorisation([])
        console.log(error?.response)
      }

    }
    const fetchData1 = async _=> {
      try{
        const reponse = await axios.get(DEMANDE_URL)
        setListeDemande(reponse.data)
      }
      catch(error){
        setListeDemande([])
        console.log(error?.response)
      }
    }
    
    fetchData();
    fetchData1();
  }, [useReducerValue])

  
  const autorisation_classe = isAutorisation ? 'text-center card-statistique active' : 'text-center card-statistique'
  const demande_classe = isDemande ? 'text-center card-statistique active' : 'text-center card-statistique'
  
  const handleAutorisation = () => {
    setIsAutorisation(true)
    setIsDemande(false)
  }
  
  const handleDemande= () => {
    setIsAutorisation(false)
    setIsDemande(true)
  }

  //  class bouton ajouter
  const bouton_ajouter_classe = isDemande ? "btn-add active" : "btn-add"

  // les donnes a afficher
  const donnees_selon_type = (liste) => {
    if(Cookies.get('role').toString().toLowerCase() === "utilisateur")
    {
      return liste.filter(item => item.MATRICULE_AGENT === Cookies.get('matricule'))
    }
    else if(Cookies.get('role').toString().toLowerCase() === "admin")
    {
      return liste.filter(item => item.TYPE_SERVICE === Cookies.get('service'))
    }
    else
    {
      return liste
    }
  }

  // filtre de la liste des demandes
  const demandes_affichees = donnees_selon_type(listeDemande)
  .filter( demande =>
    demande.MATRICULE_AGENT.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    demande.PRENOMS.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    demande.RAISON.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    demande.ETAT_DE_LA_DEMANDE.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    demande.LIEU_DE_JOUISSANCE.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    demande.TYPE_SERVICE.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    demande.DUREE_DEMANDER.toString().includes(filtreRecherche) ||
    new Intl.DateTimeFormat(
      'fr-FR',{dateStyle: 'long'}
      ).format(new Date(demande.DATE_DEBUTA)
      ).toString() === filtreRecherche ||
    new Intl.DateTimeFormat(
      'fr-FR',{dateStyle: 'long'}
      ).format(new Date(demande.DATE_FINA)
      ).toString() === filtreRecherche ||
    new Intl.DateTimeFormat(
      'fr-FR',{dateStyle: 'long'}
      ).format(new Date(demande.DATE_DE_REPRISE)
      ).toString() === filtreRecherche
  )

  // filtre de la liste des autorisation
  const autorisations_affichees = donnees_selon_type(listeAutorisation)
  .filter( autorisation =>
    autorisation.MATRICULE_AGENT.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    autorisation.PRENOMS.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    autorisation.TYPE_SERVICE.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    autorisation.ETAT_AUTORISATION.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    autorisation.LIEU_JOUISSANCE.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
    parseInt(autorisation.DUREE_AUTORISATION)==parseInt(filtreRecherche) ||
    new Intl.DateTimeFormat(
      'fr-FR',{dateStyle: 'long'}
      ).format(new Date(autorisation.DEBUT_AUTORISATION)
      ).toString() === filtreRecherche ||
    new Intl.DateTimeFormat(
      'fr-FR',{dateStyle: 'long'}
      ).format(new Date(autorisation.FIN_AUTORISATION)
      ).toString() === filtreRecherche ||
    new Intl.DateTimeFormat(
      'fr-FR',{dateStyle: 'long'}
      ).format(new Date(autorisation.REPRISE_DE_SERVICE)
      ).toString() === filtreRecherche
  )

  

    // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       LOGIN_URL,
  //       JSON.stringify({user, pwd}),
  //       {
  //         headers: { 'content-type': 'application/json' },
  //         withCredentials: true
  //       }
  //     );

  //     Cookies.set("username", response?.data?.username)
  //     setUser('');
  //     setPwd('');
  //     navigate(from, { replace: true });
  //   } 
  //   catch (err) {
  //     if(!err.response) {
  //       setErrMsg('Pas de réponse du serveur');
  //     }
  //     else if(err.response?.status === 400) {
  //       setErrMsg('username ou mot de passe erroné');
  //     }
  //     else if(err.response?.status === 401) {
  //       setErrMsg('acccès refusé');
  //     }
  //     else {
  //       setErrMsg('echec de la connexion')
  //     }
  //   }

  // }
  
  const role = Cookies.get("role");
 

  const navigate = useNavigate()
  const location = useLocation()

  const rejeterdemande = async (demande)=>{
    const URL_VALIDATION = `/demande_autorisation/validation/${demande.ID_DEMANDEA}/non`
   try{ 
    const reponse = await axios.post(URL_VALIDATION,{id:demande.ID_DEMANDEA, im_agent:demande.MATRICULE_AGENT})
    navigate(location.pathname)
    setIsSuccess(true)
    setToastTitle("Validation de demande")
    setToastMessage(reponse?.data?.message)
    setShowToast(true)
    forceUpdate()
  }
  catch(error){
    setIsSuccess(false)
    setToastTitle("Validation de demande")
    setToastMessage(error?.response?.data?.message)
    setShowToast(true)
    // setIsValidation(false)
    // setIsModification(false)
  }
}

  const approuverdemande = async (demande)=>{
    const URL_APPROBATION =  `/demande_autorisation/validation/${demande.ID_DEMANDEA}/oui`
    try{
      const reponse = await axios.post(URL_APPROBATION,{
        im_agent: demande.MATRICULE_AGENT,
        prenoms: demande.PRENOMS,
        type_agent: demande.TYPE_AGENT,
        IM_responsable: demande.IM_RESPONSABLE,
        debut_autorisation: demande.DATE_DEBUTA,
        fin_autorisation: demande.DATE_FINA,
        duree_autorisation: demande.DUREE_DEMANDER,
        reprise_de_service: demande.DATE_DE_REPRISE,
        lieu_jouissance: demande.LIEU_DE_JOUISSANCE,
        type_service: demande.TYPE_SERVICE
      })
      navigate(location.pathname)
      setIsSuccess(true)
      setToastTitle("Validation de demande")
      setToastMessage(reponse?.data?.message)
      setShowToast(true)
      forceUpdate()
    }
    catch(error){
      setIsSuccess(false)
      setToastTitle("Validation de demande")
      setToastMessage(error?.response?.data?.message)
      setShowToast(true)
      // setIsValidation(false)
      // setIsModification(false)
    }
  }

  return (
    <div className='container-fluid'  style={{
      background: '#E4E9F7'
    }}>

      {((Cookies.get('role').toLocaleLowerCase() !=="superadmin") && (Cookies.get('statut').toLocaleLowerCase() === "actif")) && <NouvelleDemande
        show={modalshow}
        onPost={() => {forceUpdate()}}
        onHide={() => {setModalshow(false)}}
      />}

      <div className='row my-3 mx-0 clou'>

        <div className='col-6 d-flex'>
          <div className='container-fluid my-auto'>
            <h4 className='mb-0'>
              Autorisation
            </h4>
            <span>{ Cookies.get('role') }</span>
          </div> 
        </div>


        <div className='col-5 d-flex px-0 justify-content-end'>
          <div className={autorisation_classe} onClick={handleAutorisation}>
              <h6>Autorisations</h6>
              <span>{ autorisations_affichees.length }</span>
          </div>

          <div className={demande_classe} onClick={handleDemande}>
              <h6>Demandes</h6>
              <span>{ demandes_affichees.length }</span>
          </div>

        </div>

        <div className='col-1 my-auto d-flex justify-content-end px-0'>
          <button
            disabled={isDemande? false : true }
            className={bouton_ajouter_classe}
            onClick = {
              () => {
                setModalshow(true)
                setIsNewDemande(true)
                setIsValidation(false)
                setIsModification(false)
              }
            }
          >
            <IoAdd />
          </button>
        </div>
      </div>

      <hr />

      <div className='container-fluid clou tableau-container pt-2'>
        <div className='row my-1'>
          <div className='col-2'>
              <input
                placeholder='recherche ...'
                type='text'
                onChange=
                  {
                    e => setFiltreRecherche(e.target.value)
                  }
                className='text-input-rec'/>
          </div>

          <div className='col-3'>
              <input
                type='date'
                onChange=
                  {
                    e => {
                      let temp = e.target.valueAsNumber
                      temp
                      ? setFiltreRecherche(
                      new Intl.DateTimeFormat(
                        'fr-FR',{dateStyle: 'long'}
                        ).format(new Date(temp)
                        ).toString())
                      : setFiltreRecherche('')

                    }
                  }
                className='text-input-rec'/>
          </div>

          <div className='col-3'>
              <select
                className='text-input-rec'
                aria-label="Default select example"
                defaultValue=""
                onChange=
                  {
                    e=>setFiltreRecherche(e.target.value)
                  }
              >
                  {
                    isDemande
                    ? <>
                      <option value="">Toutes</option>
                      <option value="approuvée">approuvée</option>
                      <option value="rejetée">rejetée</option>
                      <option value="nouvelle">Nouvelle</option>
                    </>
                    : <>
                      <option value="">Toutes</option>
                      <option value="en cours">en cours</option>
                      <option value="terminée">terminée</option>
                    </>
                  }
              </select>
          </div>

          <div className='col-3'>
              <select
                className='text-input-rec'
                aria-label="Default select example"
                disabled = {selecte_disable}
                defaultValue={Cookies.get('service')}
                onChange=
                  {
                    e=>setFiltreRecherche(e.target.value)
                  }
              >
                  <option value="">services</option>
                  <option value={listeservices.st}> {listeservices.st} </option>
                  <option value={listeservices.prmp}> {listeservices.prmp} </option>
                  <option value={listeservices.srdc}> {listeservices.srdc} </option>
                  <option value={listeservices.sbr}> {listeservices.sbr} </option>
              </select>
          </div>

          <div className='col-1 search-icon mx-auto my-auto justify-content-center'>
            <ImSearch />
          </div>
      </div>

      <hr />

      <div className='row px-2'>
        <table className='table table-hover table-striped'>
          <thead  style={{color:'white', background: '#F1B047',opacity: '.85'}}>
            <tr>
              <th>IM</th>
              <th>Prenoms</th>
              <th>Debut</th>
              <th>Fin</th>
              <th>Reprise Service</th>
              <th>statut</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              isDemande 
              ?
                demandes_affichees
                .map( (demande, index) => (
                  <tr key={index} className="justify-content-end" style={demande.ETAT_DE_LA_DEMANDE.toLocaleLowerCase() === "nouvelle"?{background:'#F1B047'}:null}>
                    <td> { demande.MATRICULE_AGENT } </td>
                    <td> { demande.PRENOMS } </td>
                    <td>
                      {
                        // demande.DATE_DEBUTA
                        new Intl.DateTimeFormat(
                        'fr-FR',{dateStyle: 'long'}
                        ).format(new Date(demande.DATE_DEBUTA)
                        ).toString()
                      }
                    </td>
                    <td>
                      {
                        // demande.DATE_FINA
                        new Intl.DateTimeFormat(
                        'fr-FR',{dateStyle: 'long'}
                        ).format(new Date(demande.DATE_FINA)
                        ).toString()
                      }
                    </td>
                    <td>
                      {
                        // demande.DATE_REPRISE
                        new Intl.DateTimeFormat(
                        'fr-FR',{dateStyle: 'long'}
                        ).format(new Date(demande.DATE_DE_REPRISE)
                        ).toString()
                      }
                    </td>
                    <td> { demande.ETAT_DE_LA_DEMANDE } </td>
                    <td className='text-center'>
                        {
                          (demande.ETAT_DE_LA_DEMANDE.toLocaleLowerCase() === "nouvelle") &&
                          <span>
                            {
                              // (Cookies.get('matricule')!==demande.MATRICULE_AGENT)?
                              (Cookies.get("matricule") === demande.IM_RESPONSABLE) &&
                              <span>
                                <Link to='/mndpt/autorisation'>
                                  <button
                                  className='accept-reject green'
                                  onClick={()=>approuverdemande(demande)}
                                  > <FaCheck/>Approuver</button>
                                </Link>
                                <Link to='/mndpt/autorisation'>
                                  <button
                                  className='accept-reject red'
                                  onClick={()=>rejeterdemande(demande)}
                                  > <FaTimes/>Rejeter</button>
                                </Link>
                              </span>
                              // :null
                            }
                          </span>
                        }
                    </td>
                  </tr>
                  ))
              :
                autorisations_affichees
                .map( (autorisation, index) => (
                  <tr key={index}>
                      <td> { autorisation.MATRICULE_AGENT } </td>
                      <td> { autorisation.PRENOMS } </td>
                      <td>
                        {
                          // autorisation.DEBUT_AUTORISATION
                          new Intl.DateTimeFormat(
                          'fr-FR',{dateStyle: 'long'}
                          ).format(new Date(autorisation.DEBUT_AUTORISATION)
                          ).toString()
                        }
                      </td>
                      <td>
                        {
                          // autorisation.FIN_AUTORISATION
                          new Intl.DateTimeFormat(
                          'fr-FR',{dateStyle: 'long'}
                          ).format(new Date(autorisation.FIN_AUTORISATION)
                          ).toString()
                        }
                      </td>
                      <td>
                        {
                          // autorisation.REPRISE_DE_SERVICE
                          new Intl.DateTimeFormat(
                          'fr-FR',{dateStyle: 'long'}
                          ).format(new Date(autorisation.REPRISE_DE_SERVICE)
                          ).toString()
                        }
                      </td>
                      <td > { autorisation.ETAT_AUTORISATION } </td>
                      <td className='text-center'>
                      </td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
      </div>

    </div>
  )
}

export default Autorisation;