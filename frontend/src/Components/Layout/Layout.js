import React, { useState, Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import Menu from '../Menu/Menu';
import Notification from './Notification';
import Cookies from 'js-cookie'
import user_picture from '../../assets/img/user.jpg';
import './Layout.css'
import useCustomeContext from '../Context/useCustomeContext';

function Layout() {

    const {
        totalnotification, 
    } = useCustomeContext()


    const [showNotif, setShowNotif] = useState(false)

    const username = Cookies.get("username") 
    const usertype = Cookies.get("role").toLowerCase()


    return (

        <Fragment>
            <Menu />
            <Notification showNotif={showNotif} setShowNotif={setShowNotif} />
            <section className="home">
                <div className="navbar fixed-top bg-white py-0 justify-content-end">
                    <ul className="nav d-flex align-items-center">
                        <li className="nav-item-header" onClick={()=>setShowNotif(!showNotif)}>
                            <i className='notification-icon'>
                                <IoNotificationsOutline />
                            </i>
                            {(totalnotification!==0)&&<span className="badge rounded-pill">{totalnotification}</span>}
                        </li>
                        <li className="nav-item-header">
                            <div className='row d-flex align-items-center'>
                                <Link className='profil-link' to={`/mndpt/personnels/profile/${Cookies.get('id_agent')}`}>
                                    <div className='col d-flex align-items-center px-0"'>
                                        <img className="rounded-circle image-profile" src={Cookies.get('photo')} alt="user picture" />
                                    </div>
                                    <div className=' ps-2 col justify-content-center'>
                                        <span className="user-name">{ username }</span> <br />
                                        <span className="user-type">{ usertype }</span>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="container-fluid container-route"  style={{background: '#E4E9F7'}}>
                    <Outlet />
                </div>
            </section>
        </Fragment>
    )
}

export default Layout