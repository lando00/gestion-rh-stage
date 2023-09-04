import { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import Modal from 'react-bootstrap/Modal';
import useCustomeContext from '../Context/useCustomeContext';
import axios from '../../Api/axios';
import './Autorisation.css';

const URL_CREATE_DEMANDE = "/demande_autorisation/create"

const responsable = {
  'PRMP':'2812-10', 
  'Service Bureau Regional':'2812-11',
  'Service technique': '2812-09',
  ' Service relation avec Direction Central': '2712-013',
  directeur:"2712-010"
}

function NouvelleDemande(props) {

  const dateDebut = useRef()
  const dateFin = useRef()
  const duree = useRef()
  const {
    isValidation, 
    isModification,
    setIsNewDemande,
    isNewDemande,
    modalshow, 
    setModalshow,
    reqbody,
    setReqbody,
    showToast, 
    setShowToast,
    isSuccess, 
    setIsSuccess,
    toastMessage, 
    setToastMessage,
    toastTitle,
    setToastTitle,
  } = useCustomeContext()

  useEffect(()=>{
    setReqbody({
        ...reqbody,
        matricule_agent: Cookies.get("matricule"),
        prenoms: Cookies.get("prenoms"),
        type_agent: Cookies.get("role"),
        type_service: Cookies.get("service"),
        etat_de_la_demande: 'nouvelle'
    })
  },[])

  // formater ladate
  const formatDate = (date) =>{
    const temp = new Date(date)
    let annee = temp.getFullYear()
    let mois = (parseInt(temp.getMonth()+1)<=9)?"0"+parseInt(temp.getMonth()+1) : parseInt(temp.getMonth()+1)
    let jour = (temp.getDate()<=9)?"0"+temp.getDate() : temp.getDate()
    return annee + "-" + mois + "-" + jour
  }

  // envoyer les donnees du formulaire
  // const [ isValidate, setIsValidate ] = useState(false)

  const handleSubmit = async ()=>{
    try{
        if(isNewDemande){
          const DEMANDE_URL = "/demande_autorisation/create"
          const reponse = await axios.post(
          DEMANDE_URL,
          reqbody
        )
        alert(reponse.message)
        setModalshow(false)
        setIsNewDemande(false)
      }
      }
    catch(error){
      alert(error.Response)
    }
  }

  const readonly = (isValidation || isModification)? true : false

  // const clearReqBody = () =>{
  //   setReqbody({
  //     matricule_agent: Cookies.get("matricule"),
  //     prenoms: Cookies.get("prenoms"),
  //     type_agent: Cookies.get("role"),
  //     IM_responsable: '',
  //     debut_autorisation: '',
  //     fin_autorisation: '',
  //     duree_autorisation: '',
  //     reprise_de_service: '',
  //     lieu_jouissance: '',
  //     etat_autorisation: '',
  //     type_service: Cookies.get("service"),
  //     type_autorisation: '',
  //     motif: '',
  //     id_demandeA: '',
  //     raison:'',
  //     etat_de_la_demande: 'Nouvelle'
  //   })
  // }

  const submitAuto = async (data) =>{
    console.log(data)
    try{
      const reponse = await axios.post(URL_CREATE_DEMANDE,data)
      setIsSuccess(true)
      setToastTitle("Demande d'autorisation")
      setToastMessage(reponse?.data?.message)
      setShowToast(true)
      props.onPost()
    }
    catch (error){
      setModalshow(true)
      setIsSuccess(false)
      setToastTitle("Demande d'autorisation")
      setToastMessage(error?.response?.data?.message)
      setShowToast(true)
    }
  }

    return (
      <Modal
      {...props}
        show={modalshow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Demande d'autorisation
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className='container'>
                  { 
                    (isValidation || isModification ) &&
                    <div className='row my-2'>
                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='id'>{isValidation? "ID Demande" : "ID Autorisation"}</label>
                          <input required id="id" className="text-input" readOnly value={reqbody.id_demandeA}/>

                      </div>

                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='im'>IM</label>
                          <input required type='text' id="im" className="text-input"readOnly value={reqbody.matricule_agent} />

                      </div>

                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='prenoms'>Prenoms</label>
                          <input required id="prenoms" className="text-input" readOnly value={reqbody.prenoms}/>

                      </div>

                  </div> }

                  { (isValidation || isModification ) && <hr />}

                  <div className='row my-2'>
                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='destinataire'>Destinataire</label>
                          <select 
                            required 
                            id="destinataire"
                            className="text-input"
                            onClickCapture={
                              e => {
                                console.log(reqbody)
                              setReqbody({...reqbody, IM_responsable: e.target.value})
                          }}>
                              <option value={responsable.directeur}>Directeur</option>
                              {(Cookies.get('role').toLocaleLowerCase() === 'utilisateur')&&<option value={responsable[Cookies.get('service')]}>Chef de service</option>}
                          </select>

                      </div>

                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='type_autorisation'>Type d'autorisation</label>
                          <select
                            required 
                            id="type_autorisation"
                            className="text-input"
                            onClickCapture={
                              e => {
                                setReqbody({...reqbody,type_autorisation: e.target.value})
                                console.log(reqbody)
                          }}>
                              <option value="autorisation d'absence ordinaire">autorisation d'absence ordinaire</option>
                              <option value="hospitalisation">hospitalisation</option>
                              <option value="élection politique">élection politique (candidat)</option>
                              <option value="autorisation spéciale d'absence">autorisation spéciale d'absence</option>
                          </select>

                      </div>

                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='motif'>Motif</label>
                          <input
                            required 
                            type='text'
                            id="motif"
                            className="text-input"
                            onChange={
                              e => {
                              setReqbody({...reqbody, raison: e.target.value})
                              console.log(reqbody)
                          }} />

                      </div>

                  </div>

                  <hr />

                  <div className='row my-2'>

                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='debut'>Date de début</label>
                          <input
                            required 
                            type='date' 
                            id="debut" 
                            min={formatDate(new Date())}
                            ref={dateDebut} 
                            className="text-input" 
                            onChange={ 
                              e => {
                              setReqbody({...reqbody, debut_autorisation: e.target.value.toString()})
                              console.log(reqbody)
                          }} />

                      </div>

                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='fin'>Date d'expiration</label>
                          <input 
                            required 
                            type='date' 
                            id="fin" 
                            min={formatDate(new Date(dateDebut?.current?.valueAsDate).getTime()+(24*60*60*1000)).toString()}
                            ref={dateFin} 
                            className="text-input" 
                            onChange={ 
                              e => {
                              setReqbody({
                                ...reqbody,
                                fin_autorisation: e.target.value.toString(),
                                duree_autorisation: parseInt((dateFin.current.valueAsDate - dateDebut.current.valueAsDate)/(1000*60*60*24)+1).toString()});
                              duree.current.valueAsNumber = parseInt((dateFin.current.valueAsDate - dateDebut.current.valueAsDate)/(1000*60*60*24)+1)
                              console.log(reqbody)
                          }} />

                      </div>

                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='retour'>Date de retour au service</label>
                          <input 
                            required 
                            type='date' 
                            id="retour" 
                            className="text-input" 
                            min={formatDate(new Date().getTime()+((duree?.current?.valueAsNumber || 3)*24*60*60*1000))}
                            onChange={ 
                              e => {
                              setReqbody({...reqbody, reprise_de_service: e.target.value.toString()})
                              console.log(reqbody)
                          }} />

                      </div>
                  </div>

                  <hr />

                  <div className='row my-2'>

                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='duree'>Durée demandée</label>
                          <input
                            required 
                            type='number' 
                            id="duree" 
                            className="text-input" 
                            ref={duree} 
                            onChange={ 
                              e => {
                              setReqbody({...reqbody, duree_autorisation: e.target.value})
                              console.log(reqbody)
                          }} />

                      </div>

                      <div className='col-4 mx-auto'>

                          <label className='label-input' htmlFor='lieu'>Lieu de jouissance</label>
                          <input 
                            required 
                            type='text'
                            id="lieu" 
                            className="text-input" 
                            onChange={ 
                              e => {
                              setReqbody({...reqbody, lieu_jouissance: e.target.value})
                              console.log(reqbody)
                          }} />

                      </div>

                      <div className='col-4 mx-auto'>
                      </div>

                  </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <button className='btn-vert validation-btn' onClick={()=>{
                submitAuto(reqbody)
                setModalshow(false)
                }}>
                  {
                    isValidation
                    ? "Approuver"
                    : isModification
                    ? "Modifier"
                    : "Envoyer"
                  }
                </button>
              <button className='btn-rouge validation-btn' onClick={()=>{
                setModalshow(false)
              }}>
                {
                  isValidation
                  ?"Rejeter"
                  :"Annuler"
                }
              </button>
            </Modal.Footer>
      </Modal>
    );
  }

  export default NouvelleDemande;