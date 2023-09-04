import React, { useState, useEffect, useReducer } from 'react';
import useCustomeContext from '../Context/useCustomeContext';
import Cookies from 'js-cookie';
import axios from '../../Api/axios';
import { useNavigate } from 'react-router-dom';
import './Notification.css'

const URL_NOTIFICATION = '/rapport/liste'
const URL_MODIFICATION_NOTIF = '/rapport/update'

function Notification({showNotif, setShowNotif}) {
    const navigate = useNavigate();

    const [ useReducerValue, forceUpdate ] = useReducer(x=>x+1,0)
    
    const {
        setTotalnotification
    } = useCustomeContext()

    const [ listerapport , setListerapport ] = useState([])
    
    useEffect(()=>{
        const fetchData = async ()=>{
            try
            {
                const reponse = await axios(URL_NOTIFICATION)
                const donnee = (reponse.data)
                const donnees_affichees = donnee.filter(rapport=>rapport.MATRICULE_AGENT === Cookies.get("matricule"))
                const nombre_nouvelle_notif = donnees_affichees.filter(rapport=>rapport.SITUATION_RAPPORT.toLowerCase() === "nouvelle")
                setTotalnotification(nombre_nouvelle_notif.length)
                setListerapport(donnees_affichees)
            }
            catch(error)
            {
                console.log(error?.response?.data?.message)
            }
        }
        fetchData();
    },[useReducerValue])

    const changeRapport = async (rapport) =>{
        try
        {
            const reponse = await axios.post('/rapport/update', {id:rapport.ID_RAPPORT})
            console.log(reponse.data[0]?.message)
            if(rapport.OBJET.toString().toLowerCase() === "retard"){navigate('/mndpt/pointage')}
            else if(rapport.OBJET.toString().toLowerCase() === "demande d'autorisation"){navigate('/mndpt/autorisation')}
            setShowNotif(false)
            forceUpdate()
        }
        catch(error){
            console.log(error?.response?.data)
        }
    }

    const classe = showNotif ? "notification-container expand" : "notification-container"
    const bg = (situation) => (situation.toLowerCase()==="nouvelle")?"lightGray":"transparent"
    const new_notif_class = (situation) => (situation.toLowerCase()==="nouvelle")?"new_notif":"old_notif"

    return (
    <aside className={classe}>
        <h4 className='text-center'>Notifications</h4>
        <hr/>
        {
            listerapport.map((rapport,index)=>
            <>
            <div 
                key={index} 
                className={`container bla ${new_notif_class(rapport.SITUATION_RAPPORT)}`}
                onClick={() =>changeRapport(rapport)}
                >
                <div className='row d-flex justify-content-around'>
                    <div className='col d-flex justify-content-around'>
                        <h6>{rapport.OBJET}</h6>
                    </div>
                    <div className='col d-flex justify-content-around'>
                        <span
                        style={{
                            fontStyle: 'italic',
                            fontSize:'.8rem'}}>
                            {new Intl.DateTimeFormat(
                                'fr-FR',{dateStyle: 'long'}
                                ).format(new Date(rapport.DATE_RAPPORT)
                                ).toString()}
                        </span>
                    </div>
                </div>
                <div className='row'>
                    <p>{rapport.CONTENU_RAPPORT}</p>
                </div>
            </div>
            <hr/>
            </>
            )
        }
        
    </aside>
    )
}

export default Notification;