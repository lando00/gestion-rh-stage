import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import useCustomeContext from '../Context/useCustomeContext';
import axios from '../../Api/axios';
import { IoAdd } from 'react-icons/io5';
import { Outlet, Link } from 'react-router-dom';
import './Mission.css'
import { ImSearch } from 'react-icons/im';

const URL_MISSION = "/mission/liste"

function Mission() {
  
  const {
    isOutlet, 
    setIsOutlet,
    useReducerValue,
    forceUpdate
  } = useCustomeContext()  
  
  const [listeMission , setListeMission] = useState([])

  useEffect(() => {
    const fetchData = async _=> {
      try{
        const reponse = await axios.get(URL_MISSION)
        setListeMission(reponse.data)
      }
      catch(error){
        if(!error.response){
          console.log("pas de reponse du serveur!")
        }
        else{
          console.log("erreur de la connexion au serveur")
        }
      }
    }

    fetchData();
    setIsOutlet(false)
  }, [useReducerValue])

  const [filtre, setFiltre] = useState('')

    // les donnes a afficher
    const donnees_selon_type = (liste) => {
      if(Cookies.get('role') === "utilisateur")
      {
        return liste.filter(item => item.MATRICULE_AGENT === Cookies.get('matricule'))
      }
      else if(Cookies.get('role') === "admin")
      {
        return liste.filter(item => item.TYPE_SERVICE === Cookies.get('service'))
      }
      else
      {
        return liste
      }
    }

  // filtre de la liste de personnels
  const mission_affichees = donnees_selon_type(listeMission)
  .filter( mission =>
    mission.MATRICULE_AGENT.toString().toLocaleLowerCase().includes(filtre.toLocaleLowerCase()) ||
    mission.PRENOMS.toString().toLocaleLowerCase().includes(filtre.toLocaleLowerCase()) ||
    mission.ORDRE_MISSION.toString().toLocaleLowerCase().includes(filtre.toLocaleLowerCase()) ||
    mission.MOTIF_MISSION.toString().toLocaleLowerCase().includes(filtre.toLocaleLowerCase()) ||
    mission.LIEU_MISSION.toString().toLocaleLowerCase().includes(filtre.toLocaleLowerCase())
  )

  const btn_add_classe = isOutlet? "btn-add" : "btn-add active"

  return(
    <div className='container-fluid' style={{
      background: '#E4E9F7'
    }}>

      <div className='row mb-3 clou'>
        <div className='col-6 d-flex'>
          <div className='container-fluid my-auto'>
            <h4 className='mb-0'>
              Mission {isOutlet && " / Nouvelle mission"}
            </h4>
            <span>{ Cookies.get("role") }</span>
          </div>

        </div>

        <div className='col-4'>
        </div>

        <div className='col-2 d-flex align-items-center justify-content-end'>
          <Link to='/mndpt/mission/nouvellemission'>
            <button className={btn_add_classe} onClick={() => setIsOutlet(true)}>
              <IoAdd />
            </button>
          </Link>
        </div>
      </div>

      <hr/>

      {
        isOutlet
        ? <Outlet />
        : <div className='container-fluid clou tableau-container pt-2'>
           <div className='row my-1'>
              <div className='col-10'>
                <input className='text-input' type='text' placeholder="recherche ..." onChange={e=>setFiltre(e.target.value)} />
              </div>
              <div className='col-2'>
                <ImSearch/>
              </div>
            </div>
            <hr/>
          <div className='row p-2'>
            <table className='table table-hover table-striped'>
              <thead  style={{color:'white', background: '#F1B047',opacity: '.85'}}>
              <tr>
                <th>Matricule</th>
                <th>Prenoms</th>
                <th>Ordre de mission</th>
                <th>Debut</th>
                <th>Fin</th>
                <th>Reprise de Service</th>
                <th>Objet</th>
                <th>Lieu</th>
              </tr>
              </thead>
              <tbody>
                {
                  mission_affichees
                  .map((mission, index) => (
                    <tr key={index}>
                      {mission.MATRICULE_AGENT && <td>{mission.MATRICULE_AGENT}</td>}
                      {mission.PRENOMS && <td>{mission.PRENOMS}</td>}
                      {mission.ORDRE_MISSION && <td>{mission.ORDRE_MISSION}</td>}
                      {mission.DEBUT_MISSION && <td>
                        {
                          // autorisation.DEBUT_AUTORISATION
                          new Intl.DateTimeFormat(
                          'fr-FR',{dateStyle: 'long'}
                          ).format(new Date(mission.DEBUT_MISSION)
                          ).toString()
                        }
                      </td>}
                      {mission.FIN_MISSION && <td>
                        {
                          // autorisation.DEBUT_AUTORISATION
                          new Intl.DateTimeFormat(
                          'fr-FR',{dateStyle: 'long'}
                          ).format(new Date(mission.FIN_MISSION)
                          ).toString()
                        }
                      </td>}
                      {mission.DATE_RETOUR && <td>
                        {
                          // autorisation.DEBUT_AUTORISATION
                          new Intl.DateTimeFormat(
                          'fr-FR',{dateStyle: 'long'}
                          ).format(new Date(mission.DATE_RETOUR)
                          ).toString()
                        }
                      </td>}
                      {mission.MOTIF_MISSION && <td>{mission.MOTIF_MISSION}</td>}
                      {mission.LIEU_MISSION && <td>{mission.LIEU_MISSION}</td>}
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        
      }
    </div>
  )
}

export default Mission;