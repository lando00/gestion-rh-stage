import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../../Api/axios';
import{ ImSearch } from 'react-icons/im';
import useCustomeContext from '../Context/useCustomeContext';
import './pointage.css'

const URL_POINTAGE = "/pointage/view";

function Pointage() {

  const { 
    listeservices 
  } = useCustomeContext()

  const selecte_disable = Cookies.get("role").toLocaleUpperCase() !== "superadmin" ? true : false
  const [filtreRecherche, setFiltreRecherche] = useState('')



  const [ listePointage, setListePointage ] = useState([])
  useEffect(() => {
    const fetchData = async _=> {
      try{
        const reponse = await axios.get(URL_POINTAGE)
        setListePointage(reponse.data)
      }
      catch(error){
        setListePointage([])
        console.log(error)
      }
    }

    fetchData();
  }, [])


    // les donnes a afficher
    const donnees_selon_type = (liste) => {
      if(Cookies.get('role').toLocaleLowerCase() === "utilisateur")
      {
        return liste.filter(item => item.MATRICULE_AGENT === Cookies.get('matricule'))
      }
      else if(Cookies.get('role').toLocaleLowerCase() === "admin")
      {
        return liste.filter(item => item.TYPE_SERVICE === Cookies.get('service'))
      }
      else
      {
        return liste
      }
    }

    // recherche
    const pointages_affiches = donnees_selon_type(listePointage)
    .filter( pointage =>
      pointage.ID_POINTAGE.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
      pointage.MATRICULE_AGENT.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
      pointage.PRENOMS.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
      pointage.TYPE_SERVICE.toString().toLocaleLowerCase().includes(filtreRecherche.toLocaleLowerCase()) ||
      new Intl.DateTimeFormat(
        'fr-FR',{dateStyle: 'long'}
        ).format(new Date(pointage.DATE_POINTAGE)
        ).toString() === filtreRecherche
    )
    
  return (
    <div className='container-fluid pb-3'>

      <div className='row mb-3 mx-0 clou'>
        <div className='col-6 d-flex'>
          <div className='container-fluid my-auto'>
            <h4 className='mb-0'>
              Pointage
            </h4>
            <span> {Cookies.get("role")}</span>
          </div>
        </div>
        <div className='col-4'></div>
        <div className='col-2'></div>
      </div>

      <hr />

      <div className='container-fluid bg-light clou py-2'>
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

                      console.log(filtreRecherche)
                    }
                  }
                className='text-input-rec'/>
          </div>

          <div className='col-3'>
              <select
                className='text-input-rec'
                aria-label="Default select example"
                defaultValue=""
                disabled
                onChange=
                  {
                    e=>setFiltreRecherche(e.target.value)
                  }
              >
                  <option value="">Tous</option>
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

        <div className='row p-2'>
          <table className='table table-hover table-striped'>
            <thead style={{color:'white', background: '#F1B047',opacity: '.85'}}>
              <tr>
                <th>#</th>
                <th>Matricule</th>
                <th>Prenoms</th>
                <th>Date</th>
                <th>Matin</th>
                <th>Midi</th>
                <th>Retard</th>
              </tr>
            </thead>
            <tbody>
              {
                pointages_affiches
                .map((pointage, index) => 
                  (
                    <tr key={index}>
                      <td> {pointage.ID_POINTAGE}</td>
                      <td> {pointage.MATRICULE_AGENT}</td>
                      <td> {pointage.PRENOMS}</td>
                      <td> 
                        {  
                          new Intl.DateTimeFormat(
                            'fr-FR',{dateStyle: 'long'}
                            ).format(new Date(pointage.DATE_POINTAGE)
                            ).toString()
                        }
                      </td>
                      <td> {pointage.TIME_AM}</td>
                      <td> {pointage.TIME_PM}</td>
                      <td> {pointage.RETARD}</td>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  )
}

export default Pointage;