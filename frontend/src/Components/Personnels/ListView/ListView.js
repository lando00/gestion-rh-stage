import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { useState } from 'react';
import './ListView.css';
import Cookies from 'js-cookie';

const ListView = ({listPersonnel, aos, aos_offset}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [personnelParPage, setPersonneParPage] = useState(5);
    const pageNumbers = [];

    const indexOfLastPersonnel = currentPage * personnelParPage;
    const indexOfFirstPersonnel = indexOfLastPersonnel - personnelParPage;
    const currentPersonnels = listPersonnel.slice(indexOfFirstPersonnel, indexOfLastPersonnel); 
    const totalPersonnel = listPersonnel.length;

    const pagination = (totalPersonnel, personnelParPage) => {

        for(let i = 1; i <= Math.ceil(totalPersonnel / personnelParPage); i++)
        {
            pageNumbers.push(i);
        }

    }


    const paginate = (pageNumber) => {setCurrentPage(pageNumber)};

    const handleChange = (e) => {
        setCurrentPage(1);
        e.target.value === "Tous" ? setPersonneParPage(totalPersonnel) : setPersonneParPage(e.target.value)
    }
    
   

  return (
    <div className="row my-3 liste p-4"  data-aos={aos} data-aos-offset={aos_offset}>
        <div className="col-12 mb-3">
           <label htmlFor="" >
                <span className='h6 m-r-auto'>Afficher : </span>
                <select className='mx-1 form-select d-inline-block w-auto custom-select shadow-none' onChange={(e) => {handleChange(e)}}>
                    <option value="5">5 personnes</option>
                    <option value="10">10 personnes</option>
                    <option value="Tous">Tous</option>
                </select>
           </label>
        </div>
        <div className="col-12">
            <table class="table custom-table table-hover bg-white">
                <thead>
                    <tr >
                        <th className='h6' scope="col">#</th>
                        <th className='h6' scope="col">Photo</th>
                        <th className='h6' scope="col">Nom</th>
                        <th className='h6' scope="col">Fonction</th>
                        <th className='h6' scope="col">Service</th>
                        <th className='h6' scope="col">Date d'entrée</th>
                        <th className='h6' scope="col">Téléphone</th>
                        <th className='h6' scope="col">Age</th>
                        <th className='h6' scope="col">Statut</th>
                        {
                            Cookies.get('type') === 'Admin' && (
                                <th className='h6 text-center' scope="col">Editer</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>

                    {
                        currentPersonnels.map(personnel => 

                            <tr key={personnel.ID_AGENT}>
                                <th className='h6' scope="row">{personnel.ID_AGENT}</th>
                                <td>
                                    <img src={personnel.PHOTO} alt="" className="avatar2" />
                                </td>
                                <td>{personnel.PRENOMS}</td>
                                <td>{personnel.FONCTION}</td>
                                <td>{personnel.SERVICE}</td>
                                <td>{new Date(personnel.DATE_ENTREE_ADMINISTRATION).toLocaleDateString()}</td>
                                <td>{personnel.TELEPHONE}</td> 
                                <td>{new Date().getFullYear() - new Date(personnel.DATE_NAISS).getFullYear()} ans</td>
                                <td>{personnel.STATUT_PRESENCE}</td>
                                {
                                    Cookies.get('type') === 'Admin' && (
                                        <td className='text-center'>
                                            <Link to={`/mndpt/personnels/modifier/${personnel.ID_AGENT}`} className='icon-hover text-muted'><FaEdit /></Link>
                                        </td>
                                    )
                                }
                                
                            </tr>
                            )
                    }

                    
                </tbody>
            </table>
        </div>
        <div className="col-12">
            <nav aria-label="...">
            <ul className="pagination justify-content-center align-items-center mb-0">
                <span className='h6 m-r-auto'>Total Personnel : {listPersonnel.length}</span>
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <a 
                            className="page-link" 
                            style={{color : `${currentPage !== 1 ? "#198754" : ""}`, cursor:'pointer' }}
                            onClick={() => {setCurrentPage(currentPage - 1)}}
                        >
                        &laquo;
                        </a>
                    </li>
                    {
                        pagination(totalPersonnel, personnelParPage)
                    }

                    {
                        
                        pageNumbers.map(n => (
                            <li className="page-item">
                                <a 
                                    className="page-link" 
                                    style={{color : `${currentPage === n ? "#fff" : "#198754"}`, backgroundColor : `${currentPage === n ? "#198754" : ""}`}}  
                                    onClick={(e) => {paginate(n)}}
                                >
                                {n}
                                </a>
                            </li>
                        ))    
                    }

                    <li className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""}`}>
                        <a className="page-link"
                           style={{color : `${currentPage !== pageNumbers.length ? "#198754" : ""}`, 
                           cursor:'pointer'}}
                           onClick={() => {setCurrentPage(currentPage + 1)}}
                        >
                        &raquo;
                        </a>
                    </li>
                    
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default ListView
