import React, { useState } from 'react';
// import { Stop } from "@mui/icons-material";
// import { Fab } from "@mui/material";
import Modal from 'react-bootstrap/Modal';
import { FaStop } from 'react-icons/fa';
import LectureCode from './LectureCode';
import axios from '../../Api/axios';
import useCustomeContext from '../Context/useCustomeContext';

function Scanner() {

    const {
        showScanner,
        setShowScanner,
        stopScan, 
        setStopScan ,
        datapointage,
        setDatapointage,
        isValidable, 
        setIsValidable,
        setIsSuccess,
        setToastTitle,
        setToastMessage,
        setShowToast,isActif,
        setIsActif,
        isInconnu, 
        setIsInconnu
    } = useCustomeContext();

    const handleClose = () => setShowScanner(false)


    const submitPointage = async () => {
        try{
            const axiosPost = await axios.post('http://localhost:3001/pointage/create', datapointage)
            setStopScan(true)
            setShowScanner(false)
            setIsSuccess(true);
            setToastTitle('Scan réussi');
            setToastMessage(axiosPost.data.message)
            setShowToast(true);
        }
        catch(error){
            setStopScan(true)
            setShowScanner(false)
            setIsSuccess(false);
            setToastTitle('Echec du scan');
            setToastMessage(error?.response?.data?.message)
            setShowToast(true);
        }
    }

    return (
        <>
            <Modal
                show={showScanner}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Pointage</Modal.Title>
                </Modal.Header>

                <Modal.Body className="justify-content-center">
                   {
                    stopScan
                    ?<div className='container align-items-center'>

                        {
                            isValidable && <>
                                <label className='label-input' htmlFor='im'>Matricule</label>
                                <input type='text' className='text-input' id='im' value={datapointage.IM ||''} readOnly />
                                <label className='label-input' htmlFor='prenoms'>Prenoms</label>
                                <input type='text' id='prenoms'  className='text-input'  value={datapointage.PRENOMS || ''} readOnly />
                                <label className='label-input' htmlFor='heure'>Heure d'arrivée</label>
                                <input type='text' id='heure'  className='text-input' value={datapointage.heure_arrivee || ''} readOnly />
                                <label className='label-input' htmlFor='service'>Service</label>
                                <input type='text' id='service'  className='text-input' value={datapointage.TYPE_SERVICE || ''} readOnly />
                            </>
                        }

                        {!isActif && <h4 className='text-center text-danger'>Agent non en service!</h4>}
                        {isInconnu && <h4 className='text-center text-danger'>Impossible de reconnaître le code !</h4> }
                        {
                            isValidable
                            ? <button className='btn-login mt-2' onClick={submitPointage}>
                                Valider
                            </button>

                            :<div className='justify-content-center d-flex'>
                                 <button className='btn-login-danger' disabled>
                                    Invalide
                                </button>
                            </div>
                        }
                    </div>
                    : <LectureCode />
                   }
                </Modal.Body>

                <Modal.Footer>
                    {/* <Fab color="secondary" onClick={handleClose} >
                        <Stop />
                    </Fab> */}
                    <button 
                    onClick={handleClose}
                    style={{
                        boxSizing: 'border-box',
                        width:'50px',
                        height: '50px',
                        borderRadius: '35px',
                        border: 'none',
                        fontSize: '20px',
                        lineHeight: '0px',
                        color: 'white',
                        background: '#E6443A',
                        boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <FaStop />
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Scanner;