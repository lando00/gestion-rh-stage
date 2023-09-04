import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaList, FaTh, FaSearch } from "react-icons/fa";
import '../Personnels.css';
import Cookies from 'js-cookie';

const IconView = ({setView, handleFilter, filterVal, setFilterVal, setFilterTab, listPersonnel }) => {

    const inputSearch = useRef();
    const iconSearch = useRef();
    const btnSearch = useRef();

    const gridViewIcon = useRef(null);
    const listViewIcon = useRef(null);

    const showSearch = (e) => {
        e.stopPropagation();
        if(inputSearch.current.style.display === "block")
        {
            inputSearch.current.style.display= "none";
            setFilterVal('');
            setFilterTab(listPersonnel);
            btnSearch.current.classList.remove("active-search");

        }else{
            inputSearch.current.style.display= "block";
            inputSearch.current.focus();
            btnSearch.current.classList.add("active-search");
         
        } 
    }

    const showSearch2 = (e) => {
        e.stopPropagation();
        inputSearch.current.style.display= "block";
    }

    const handleClickIcon = (view) => {
        setView(view);
        if(view === "ListView"){
            listViewIcon.current.classList.add("active-icon");
            gridViewIcon.current.classList.remove("active-icon");
        }else if(view === "GridView"){
            gridViewIcon.current.classList.add("active-icon");
            listViewIcon.current.classList.remove("active-icon");
        }
    }

    // document.body.addEventListener('click', ()=>{
    //     inputSearch.current.style.display= "none";
    //     setFilterVal('');
    //     setFilterTab(listPersonnel);
    //     btnSearch.current.classList.remove("active-search");
    // })
    

  return (

    <div className="col-auto float-end ms-auto d-flex">
        <div className="icon-views mx-3 d-flex">

            <div className="d-flex input-group">
                <input
                    type="search" 
                    style={{
                        padding: '0px',
                        transition: '.4s'
                    }}
                    ref={inputSearch} 
                    onInput={(e) => handleFilter(e)} 
                    onClick={(e) => {showSearch2(e)}} 
                    value={filterVal} 
                    className="search border border-1 form-control rounded-0 shadow-none" 
                    placeholder="Recherche..." />
                <div className="input-group-append">
                <button 
                    ref={btnSearch} 
                    style={{
                        color: 'darkGray',
                        border: '1px solid lightGray',
                        background:'white'
                    }}
                    id="btnSearch" 
                    className=" btn btn-link rounded-0 border border-1 " 
                    title="Recherche" 
                    onClick={(e) => {showSearch(e)}}><FaSearch ref={iconSearch} className="text-inherit" /></button>
                </div>
            </div>
            
            <button
                ref={gridViewIcon}
                style={{
                    color: 'darkGray',
                    border: '1px solid lightGray',
                    background:'white'
                }}
                className="active-icon btn btn-link border rounded-1 border-1  mx-1 " 
                title="Voir en grille" onClick={() => handleClickIcon("GridView")}>
                <FaTh className="text-inherit" />
            </button>

            <button
                ref={listViewIcon} 
                style={{
                    color: 'darkGray',
                    border: '1px solid lightGray',
                    background:'white'
                }}
                className="rounded-1 btn btn-link active border border-1   " 
                title="Voir en liste" 
                onClick={() => handleClickIcon("ListView")}>
                <FaList className="text-inherit" />
            </button>
        </div>
        {
           ((Cookies.get('type').toLocaleLowerCase() === 'superadmin') || (Cookies.get('type').toLocaleLowerCase() === 'admin')) && (

                <Link to="/mndpt/personnels/nouveau" className="btn btn-success d-flex align-items-center justify-content-center rounded-pill">
                    <FaPlus/>
                    <span className="mx-1">Nouveau</span>
                </Link>

            )
        }
        
    </div>

  )
}

export default IconView
