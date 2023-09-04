import React, { useState, useEffect } from 'react';
import GridView from "../GridView/GridView";
import ListView from "../ListView/ListView";
import TitreBlock from "../TitreBlock/TitreBlock";
import IconView from "../IconView/IconView";

const ListePersonnel = (props) => {
    
    const [view , setView] = useState("GridView");
    const [filterTab, setFilterTab] = useState([]);
    const [filterVal , setFilterVal] = useState('');

    useEffect(() => {
        
        setFilterTab(props.listPersonnel);
       
    }, [props.listPersonnel]);


    const handleFilter = (e) => {
        if(e.target.value === ''){
            setFilterTab(props.listPersonnel)
        }else{
            const filterResult = props.listPersonnel.filter(item => item.NOM.toLowerCase().includes(e.target.value.toLowerCase()) || item.PRENOMS.toLowerCase().includes(e.target.value.toLowerCase()) || item.SERVICE.toLowerCase().includes(e.target.value.toLowerCase()))
            setFilterTab(filterResult);
           
        }
        setFilterVal(e.target.value);
    }
    return (
        <>
            <div className="row align-items-center">
                <TitreBlock titleItem="Liste" />
                <IconView setView={setView} handleFilter={handleFilter} filterVal={filterVal} setFilterVal={setFilterVal} setFilterTab={setFilterTab} listPersonnel={props.listPersonnel}/>
            </div>

            {view === "GridView" ? <GridView listPersonnel={filterTab} /> : <ListView listPersonnel={filterTab} aos="fade-up" aos_offset="100" />}
        </>
    )
}

export default ListePersonnel;
