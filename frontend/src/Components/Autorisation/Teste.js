import React, { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Teste() {

    // // export const datediff = (date1, date2) => {
    // //     let date1formatee = new Date(date1);
    // //     let date2formatee = new Date(date2);
    // //     let difference = date2formatee.getTime() - date1formatee.getTime();
    // //     return parseInt(difference / (1000*60*60*24))
    // // }

    // export const formaterDate = (dateparam) => {
    //     let date = new Date(dateparam)
    //     return date.getFullYear() + "-" + parseInt(date.getMonth())+1 + "-" + date.getDate()
    // }

    // export const dateFr = (dateparam) => {
    //     let date = new Date(dateparam)
    //     return new Intl.DateTimeFormat('fr-FR',{dateStyle: 'medium'}).format(date)
    // }

    const date1str = useRef('')
    const date2str = useRef('')
    const time1str = useRef('')
    const time2str = useRef('')
    const duree = useRef('')

    const navigate = useNavigate()
    const location = useLocation()
    console.log(navigate)
    console.log(location)

    const handleDate1 = ()=> {
        let temp = new Date(date1str.current.valueAsDate)
        let result = temp.getFullYear() + "-" + parseInt(temp.getMonth()+1 )+ "-" + temp.getDate()
        console.log(result)
    }

    const handleDate2 =() => {
        console.log(date2str.current.valueAsDate)
        duree.current.valueAsNumber = parseInt(((date2str.current.valueAsDate - date1str.current.valueAsDate)/ (1000*60*60*24))+1)
        console.log(date2str.current.valueAsDate<date1str.current.valueAsDate)
    }

    return (
        <div>
            Teste
            {/* <input type='date'  defaultValue='2023-02-22' ref={date1str} onChange={handleDate1}/>
            <input type='date' min='2023-01-08' ref={date2str} onChange={handleDate2}/>
            <input type='time' ref={time1str} onChange={e=>console.log(e)}/>
            <input type='time' defaultValue='14:30' ref={time2str}/>
            <input type='number' min={1} ref={duree}  /> */}
            <select
                required 
                id="type_autorisation"
                className="text-input"
                onClickCapture={
                    e => console.log(e.target.value) }>
                    <option value="autorisation d'absence ordinaire">autorisation d'absence ordinaire</option>
                    <option value="hospitalisation">hospitalisation</option>
                    <option value="élection politique">élection politique (candidat)</option>
                    <option value="autorisation spéciale d'absence">autorisation spéciale d'absence</option>
                </select>

        </div>
    )
}

export default Teste;

