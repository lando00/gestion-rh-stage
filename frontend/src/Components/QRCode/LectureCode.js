import React, { useState } from 'react';
import QrScanner from 'qr-scanner';
import useCustomeContext from '../Context/useCustomeContext';
import axios from '../../Api/axios';
import Cookies from 'js-cookie';

function LectureCode() {

    const {
        setShowToast,
        setIsSuccess,
        setToastMessage,
        setToastTitle,
        datapointage,
        setDatapointage,
        setShowScanner,
        stopScan, 
        setStopScan,
        infoPersonnel,
        isValidable, 
        setIsValidable,isActif,
        setIsActif,
        isInconnu, 
        setIsInconnu
    } = useCustomeContext();

    // const handlePointage = async (matricule, prenoms, heur)=>{
    //     try{
    //         const valide = await axios.post('/pointage/create', {IM: matricule, PRENOMS: prenoms, heure_arrivee: heur})
    //         alert(valide.message)
    //         console.log(valide.data.message)
    //     }
    //     catch(erreur){
    //         alert(erreur.message)
    //         console.log(erreur.data.response)
    //     }
    // }
    
    // const submitPointage = async (params) => {
    //     let date = new Date();
    //     let hh = date.getHours();
    //     let mm = date.getMinutes();
    //     let arrivee = hh + ":" + mm ;
    //     setDataPointage({
    //         IM: params,
    //         Heur_Arr: arrivee
    //     })
    //     try{
    //         const axiosPost = await axios.post('http://localhost:3001/pointage/create', dataPointage)
    //         setStopScan(true);
    //         setIsSuccess(true);
    //         setToastTitle('Scan réussi');
    //         setToastMessage('votre pointage a été éffectué avec succès')
    //         setShowScanner(false);
    //         setShowToast(true);
    //     }
    //     catch(error){
    //         setStopScan(true);
    //         setIsSuccess(false);
    //         setToastTitle('Echec du scan');
    //         setToastMessage(error.response)
    //         setShowScanner(false);
    //         setShowToast(true);
    //     }
    // }

    const scanNow = async() => {

        await new Promise(r => setTimeout(r,100))
        const videoElement = document.getElementById('scanView')

        const scanner = new QrScanner(
            videoElement,
            result => {
                let agent = infoPersonnel.find(personnel => personnel.IM === result.data)
                if(agent){
                    if(agent.STATUT_PRESENCE.toString().toLowerCase() != "actif")
                    {
                        setIsInconnu(false)
                        setIsValidable(false)
                        setIsActif(false)
                        setStopScan(true)
                    }
                    else {
                        let date = new Date();
                        let hh = date.getHours();
                        let mm = date.getMinutes();
                        let arrivee = hh + ":" + mm ;
                        setDatapointage({
                            IM: agent.IM,
                            PRENOMS: agent.PRENOMS,
                            statut: agent.STATUT_PRESENCE,
                            heure_arrivee: arrivee,
                            TYPE_SERVICE: agent.SERVICE
                        })
                        setIsInconnu(false)
                        setIsActif(true)
                        setIsValidable(true)
                        setStopScan(true)
                    }
                }
                else{
                    setDatapointage({
                        IM:'inconnu' ,
                        PRENOMS:'inconnu' ,
                        heure_arrivee: ''
                    })
                    setIsInconnu(true)
                    setIsActif(true)
                    setIsValidable(false)
                    setStopScan(true)
                }
                // submitPointage(result)
            },
            {
                onDecodeError: error => {
                },
                maxScansPerSecond: 1,
                highlightScanRegion:true,
                highlightCodeOutline:true,
                returnDetailedScanResult:true
            }
        )

        await scanner.start()
        while( stopScan === false ) await new Promise(r => setTimeout(r,100))
        scanner.stop()
        scanner.destroy()
    }

    scanNow();
    
    return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-10 mx-auto'>
                        <video
                                id="scanView"
                                style={{
                                    width: '100%',
                                    maxWidth: '400px',
                                    height: '100%',
                                    maxHeight: '400px',
                                    borderRadius: '5px',
                                }}
                            ></video>
                    </div>
                </div>   
            </div>
    )
}

export default LectureCode;