import React, {useEffect, useState} from "react";
import ListePersonnel from "./ListePersonnel/ListePersonnel";
import './Personnels.css';
import Axios from 'axios';
import Cookies from "js-cookie";



function Personnels () {

    const [listPersonnel, setListPersonnel] = useState([]);

    
    useEffect(()=>{

        

        const fetchData = async () => {
            if(Cookies.get('type').toLocaleLowerCase() === 'admin'){

                const result = await Axios(
                    `http://localhost:3001/agent/afficherAgent/service/${Cookies.get('service')}`
                );
                
                setListPersonnel(result.data);
         
            }else if((Cookies.get('type').toLocaleLowerCase() === 'superadmin')){

                    const result = await Axios(
                        'http://localhost:3001/agent/afficherAgent'
                    );
    
                    setListPersonnel(result.data);
             
    
            }

            
        }

        fetchData();

    }, [])

    return(

        <div className="container-fluid p-4 personnel" >

           
            <ListePersonnel listPersonnel={listPersonnel} />
       
           
        </div>

    );
}

export default Personnels;