import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import logo_close from '../../assets/img/logo_mndpt_close.png';
import logo_expend from '../../assets/img/logo_mndpt.png';
import { GoDashboard } from 'react-icons/go';
import { FaUsers } from 'react-icons/fa';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { TfiTimer, TfiWrite, TfiUnlock } from 'react-icons/tfi';
import { BiLogOut } from 'react-icons/bi';
import { SiTodoist } from 'react-icons/si';
import { NavLink } from 'react-router-dom';
import { FiChevronsRight } from 'react-icons/fi';

function Menu () {

    const toggle_button_ref = useRef(null);
    const image_logo_ref = useRef(null);
    const sidebar_ref = useRef(null);

    const handle_show_hide_sidebar = () => {
        
        sidebar_ref.current.classList.toggle("close");

        if (sidebar_ref.current.classList.contains("close")) {
            image_logo_ref.current.src = logo_close;
            image_logo_ref.current.style.width = "70px";
            image_logo_ref.current.style.marginTop = "10px";
            image_logo_ref.current.style.height = "20px";
        }
        else {
            image_logo_ref.current.src = logo_expend;
            image_logo_ref.current.style.height = "auto";
            image_logo_ref.current.style.width = "100%";
            image_logo_ref.current.style.marginTop = "0px";
        }
    }

    // recuperation des variables dans cookies
    const [utilisateur, setUtilisateur] = useState(Cookies.get("role").toLocaleLowerCase())
    const [isAdmin, setIsAdmin] = useState(false)

    // afficher ou masquer les parties reservées aux admins
    useEffect(() => {
        if(utilisateur !== 'utilisateur') {
            setIsAdmin(true)
        }
        else {
            setIsAdmin(false)
        }
    },[utilisateur])

    return (
        <nav className="sidebar" ref={ sidebar_ref }>
        <header>
            <div className="image-text">

                <span className="image">
                    <img  ref={image_logo_ref} id="logo" src={logo_expend} alt="" />
                </span>

            </div>

            <div className="toggle i" onClick={handle_show_hide_sidebar}>
                <i className= "icon"><FiChevronsRight /></i>
            </div>
        </header>

        <div className="menu-bar">
            <div className="menu">

                <hr/>

                <ul className="menu-links">
                    {
                        isAdmin && (
                        <li className="nav-NavLink">
                            <NavLink to="/mndpt/dashboard">
                                <span className="icon i">
                                    <i className= "icon"><GoDashboard /></i>
                                </span>
                                <span className="text nav-text">Tableau de bord</span>
                            </NavLink>
                        </li> )
                    }

                    {
                        isAdmin && (<li className="nav-NavLink">
                            <NavLink to="/mndpt/personnel">
                                <span className="icon i">
                                    <i className= "icon"><FaUsers /></i>
                                </span>
                                <span className="text nav-text">Liste des personnels</span>
                            </NavLink>
                        </li>)
                    }
                       

                    <li className="nav-NavLink">
                        <NavLink to="/mndpt/pointage">
                            <span className="icon i">
                                <i className= "icon"><TfiTimer/></i>
                            </span>
                            <span className="text nav-text">Pointages</span>
                        </NavLink>
                    </li>

                    <li className="nav-NavLink">
                        <NavLink to="/mndpt/conge">
                            <span className="icon i">
                                <i className= "icon"><FaUmbrellaBeach/></i>
                            </span>
                            <span className="text nav-text">Congé</span>
                        </NavLink>
                    </li>

                    <li className="nav-NavLink">
                        <NavLink to="/mndpt/permission">
                            <span className="icon i">
                                <i className= "icon"><TfiUnlock /></i>
                            </span>
                            <span className="text nav-text">Permission</span>
                        </NavLink>
                    </li>

                    <li className="nav-NavLink">
                        <NavLink to="/mndpt/autorisation">
                            <span className="icon i">
                                <i className= "icon"><TfiWrite /></i>
                            </span>
                            <span className="text nav-text">Autorisation</span>
                        </NavLink>
                    </li>

                    <li className="nav-NavLink">
                        <NavLink to="/mndpt/mission">
                            <span className="icon i">
                                <i className= "icon"><SiTodoist/></i>
                            </span>
                            <span className="text nav-text">Mission</span>
                        </NavLink>
                    </li>

                </ul>
            </div>

            <div className="bottom-content">
                <li className="">
                    <NavLink to="/" onClick={
                        () => {
                            Cookies.remove('matricule')
                            Cookies.remove('username')
                            Cookies.remove('service')
                            Cookies.remove('prenoms')
                            Cookies.remove('type')
                            Cookies.remove('role')
                            Cookies.remove('photo')
                            Cookies.remove('id_agent')
                            Cookies.remove('statut')
                        }
                    }>
                        <span className="icon i">
                            <i className= "icon"><BiLogOut /></i>
                        </span>
                        <span className="text nav-text">Se déconnecter</span>
                    </NavLink>
                </li>
                
            </div>
        </div>
    </nav>
    );
}

export default Menu;