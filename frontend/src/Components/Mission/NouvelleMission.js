import React, { useState, useEffect,useRef } from 'react'
import Data from '../../Data/Data';
import useCustomeContext from '../Context/useCustomeContext'
import image from '../../assets/img/user.jpg';
import axios from '../../Api/axios';
import { Link } from 'react-router-dom';
import './Mission.css'
import { color } from '@amcharts/amcharts5';

const URL_MISION = '/mission/create'

function NouvelleMission() {

    const dateDebut = useRef()
    const dateFin = useRef()
    const duree = useRef()
    
    const [liste, setListe] = useState([])
    const {infoPersonnel} = useCustomeContext()

    
  // formater ladate
  const formatDate = (date) =>{
    const temp = new Date(date)
    let annee = temp.getFullYear()
    let mois = (parseInt(temp.getMonth()+1)<=9)?"0"+parseInt(temp.getMonth()+1) : parseInt(temp.getMonth()+1)
    let jour = (temp.getDate()<=9)?"0"+temp.getDate() : temp.getDate()
    return annee + "-" + mois + "-" + jour
  }


    useEffect(() => {
        const fecthData = async () => {
            try{
                const informations = await axios('/personnel/liste')
                setListe(informations.data)
            }
            catch(error){
                console.log(error)
            }
        }
        fecthData();
        console.log(infoPersonnel)
    }, [])

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
        useReducerValue,
        forceUpdate
      } = useCustomeContext()


    const {
        isOutlet, 
        setIsOutlet
      } = useCustomeContext()  

    const [checked, setChecked] = useState([])
    const [reqBody, setReqBody] = useState({
        agents: [],
        ordre: '',
        debut: '',
        fin: '',
        retour: '',
        motif: '',
        lieu: ''
    })

    // useEffect(() => {
    //     const fecth = async _=>{
    //         const reponse = await axios("")
    //     }
    // }, [])
    

    useEffect(() => {
        setReqBody({...reqBody,agents: checked})
    }, [checked])

    const handleCheck = (e) => {
      if(e.target.checked){
        setChecked([
          ...checked,
          {im: e.target.value , prenoms: e.target.labels[1].innerText}
        ])
      }
      else
      {
        const temp = checked.filter(item => item.im!==e.target.value)
        setChecked(temp)
        console.log(checked)
      }

      console.log(checked)
    }


    const handlesubmit = async (params) => {
        setReqBody({...reqBody,agents: params})
        try{
        const reponse = await axios.post(URL_MISION,reqBody)
        setIsOutlet(false)
        setIsSuccess(true)
        setToastTitle("Creation d'une mission")
        setToastMessage(reponse?.data?.message)
        setShowToast(true)
        forceUpdate()
        setReqBody({
            agents: [],
            ordre: '',
            debut: '',
            fin: '',
            retour: '',
            motif: '',
            lieu: ''
        })
    }
        catch (error){
        setModalshow(true)
        setIsSuccess(false)
        setToastTitle("Creation d;une mission")
        setToastMessage(error?.response?.data?.message)
        setShowToast(true)
        setReqBody({
            agents: [],
            ordre: '',
            debut: '',
            fin: '',
            retour: '',
            motif: '',
            lieu: ''
        })
        }
    }
        console.log(reqBody)
    
    return (
            <div className='container-fluid clou m-3'>
                <hr />
                <div className='container step step-one mb-3'>
                    <div className='row'>
                        <div className='col-4'>
                            <label htmlFor='ordre-mission' className='label-input'>Ordre de mission</label>
                            <input
                                type='text'
                                id='ordre-mission'
                                className='text-input'
                                onChange=
                                {e =>
                                    setReqBody({
                                        ...reqBody,
                                        ordre: e.target.value
                                    })
                                }/>
                        </div>
                        <div className='col-4'>
                            <label htmlFor='motif-mission' className='label-input'>Objet</label>
                            <input
                                type='text'
                                id='motif-mission'
                                className='text-input'
                                onChange={e=>
                                {
                                    setReqBody({
                                        ...reqBody,
                                        motif: e.target.value
                                    })
                                }} 
                            />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='lieu-mission' className='label-input'>Lieu</label>
                            <input
                                type='text'
                                id='lieu-mission'
                                className='text-input'
                                onChange={e=>
                                {
                                    setReqBody({
                                        ...reqBody,
                                        lieu: e.target.value
                                    })
                                }} 
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-4'>
                            <label htmlFor='debut-mission' className='label-input'>Date debut</label>
                            <input
                                type='date'
                                id='debut-mission'
                                className='text-input'
                                min={formatDate(new Date())}
                                ref={dateDebut}
                                onChange={e=>
                                {
                                    setReqBody({
                                        ...reqBody,
                                        debut: e.target.value.toString(),
                                    })
                                }}
                            />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='fin-mission' className='label-input'>Date fin</label>
                            <input
                                type='date'
                                id='fin-mission'
                                ref={dateFin}
                                min={formatDate(new Date(dateDebut?.current?.valueAsDate).getTime()+(24*60*60*1000)).toString()}
                                className='text-input'
                                onChange={e=>
                                {
                                    setReqBody({
                                        ...reqBody,
                                        fin: e.target.value.toString(),
                                    })
                                }}
                            />
                        </div>
                        <div className='col-4'>
                            <label htmlFor='retour-mission' className='label-input'>Date retour</label>
                            <input
                                type='date'
                                id='retour-mission'
                                className='text-input'
                                min={formatDate(new Date(dateFin?.current?.valueAsDate).getTime()+(24*60*60*1000))}
                                onChange={e=>
                                {
                                    setReqBody({
                                        ...reqBody,
                                        retour: e.target.value.toString(),
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>

                <hr />

                <div className='container step step-two bg-white' style={{borderRadius:'10px',boxShadow:'3px 3px 10px rgba(0, 0, 0, 0.3)'}}>
                    <div className='row justify-content-between'>
                        <div className='col-7'>
                            <h6 className='text-center'>Les candidats : <span> {"   "+liste.length}</span></h6>
                            <div className='container-table'>
                                <table className='table table-hover'>
                                    <thead style={{background: '#F1B047', color: 'white', borderRadius:'20px', opacity:'.7'}}>
                                        <tr>
                                            <th>Check</th>
                                            <th>Photo</th>
                                            <th>ID</th>
                                            <th>Nom</th>
                                        </tr>
                                    </thead>
                        
                                    <tbody>
                                    {
                                        liste.map((item, index) =>
                                        <tr key={ index }>
                                            <td><input
                                                id={ item.IM }
                                                type='checkbox'
                                                value={ item.IM }
                                                onChange={handleCheck} 
                                            /></td>
                                            <td><img className='rounded-pill' width='30px' height='30px' src={item.PHOTO}/></td>
                                            <td><label htmlFor={ item.IM }> { item.IM }</label></td>
                                            <td><label htmlFor={ item.IM }> { item.PRENOMS }</label></td>
                                        </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                
                        <div className='col-5'>
                            <h6 className='text-center'>
                                Les participants: 
                                <span>
                                {"   "+
                                liste
                                .filter(agent => checked.find(item => item.im.toString() === agent.IM.toString())).length
                                }
                            </span>
                            </h6>
                            <div className='container-table'>
                                <table className='table table-hover'>
                                    <thead  style={{background: '#F1B047', color: 'white', borderRadius:'20px', opacity:'.7'}}>
                                        <tr>
                                        <th>Photo</th>
                                        <th>ID</th>
                                        <th>Nom</th>
                                        </tr>
                                    </thead>
                        
                                    <tbody>
                                    {
                                        liste
                                        .filter(agent => checked.find(item => item.im.toString() === agent.IM.toString()))
                                        .map((agent, index) =>
                                        <tr key={ index }>
                                            <td><img className='rounded-pill' width='30px' height='30px' src={image}/></td>
                                            <td> { agent.IM }</td>
                                            <td>{ agent.PRENOMS }</td>
                                        </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

               <div className='row justify-content-end'>
                <div className='col-5 d-flex justify-content-end mt-2'>
                    <button
                        className='btn-vert validation-btn m-1' 
                        onClick={()=>handlesubmit(checked)}
                    >
                        Creer
                    </button>
                    
                    <Link to="/mndpt/mission">
                        <button
                            className='btn-rouge validation-btn m-1'
                            onClick={()=>setIsOutlet(false)}
                        >
                            Annuler
                        </button>
                    </Link>
                </div>
               </div>

            </div>
    )
}

export default NouvelleMission;