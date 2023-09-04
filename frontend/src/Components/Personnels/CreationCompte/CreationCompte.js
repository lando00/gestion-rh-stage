import React from 'react';
import TitreBlock from '../TitreBlock/TitreBlock';
import { TiArrowBack } from "react-icons/ti";

const CreationCompte = () => {
  return (
    <div className='col-12'>
        <TitreBlock titleItem="Compte"/>
        <div className="form-container">
            <div className="info-epoux">
                <span>Création du compte de l'agent</span>
                <hr />
            </div>
            <div className="row d-flex justify-content-center">
                <table className='col-6 my-2'>
                    <tr> 
                        <td style={{width:"180px"}}><label className='label-input mb-3' htmlFor='matricule'>N° Matricule : </label></td>
                        <td><input type="text" className='w-100 text-input mb-3' id='matricule' placeholder="N° Matricule"/></td>
                    </tr>
                    <tr> 
                        <td><label className='label-input mb-3' htmlFor='nom'>Nom d'utilisateur : </label></td>
                        <td><input type="text" className='w-100 text-input mb-3' id='nom' placeholder="Nom d'utilisateur"/></td>
                    </tr>
                    <tr> 
                        <td><label className='label-input mb-3' htmlFor='password'>Mot de passe : </label></td>
                        <td><input type="password" className='w-100 text-input mb-3' id='password' placeholder='Mot de passe'/></td>
                    </tr>
                    <tr> 
                        <td><label className='label-input mb-3' htmlFor='confirmPassword'>Confirmation mot de passe : </label></td>
                        <td><input type="password" className='w-100 text-input mb-3' id='confirmPassword' placeholder='Répétez le mot de passe'/></td>
                    </tr>
                </table>
                <div className='d-flex justify-content-center'>
                    <button type='button' className='btn btn-success btn-sm rounded-pill me-2'>Créer le compte</button>
                    <button type='button' className='btn btn-sm btn-danger rounded-pill d-flex align-items-center'><TiArrowBack className="me-1"/>Retour</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreationCompte
