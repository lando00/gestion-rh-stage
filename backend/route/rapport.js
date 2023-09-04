const express = require('express');
const connection = require('../connection');
const router = express.Router(); 

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* INSERTION DANS LA TABLE RAPPORT */

router.post('/create',  (req,res,next) =>{
    let matricule = req.body.matricule;
    let date_rapport = req.body.date_rapport;
    let objet = req.body.objet;
    let contenu = req.body.contenu_rapport;
    let situation = req.body.situation_rapport;

        if ( matricule ||date_rapport || objet || contenu || situation)
            {
    let objet = req.body.objet;
    connection.query('INSERT INTO rapport ( MATRICULE_AGENT, DATE_RAPPORT, OBJET, CONTENU_RAPPORT, SITUATION_RAPPORT) VALUES (? ,? ,? ,? ,? )' , [matricule,date_rapport,objet,contenu,situation], (err, resultat) =>{

                    if(!err){
                            res.status(200).json({message : "Insertion reussi!"});
                    }else{
                        res.status(500).json(err);
                    }
                });
        }else{
                res.status(400).json({message : "Completer tout les champs!"});
            }
    });


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE DU CONTENU DANS LA TABLE RAPPORT */

router.get('/liste', (req, res, next) =>{
    var sql = 'SELECT * FROM rapport';

    connection.query(sql, (err, resultat) =>{
        if(!err){
            res.status(200).json(resultat);
        }
        else{
            res.status(500).json(err);
        }
    });
});


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* MODIFICATION DANS LA TABLE RAPPORT */

router.patch('/update/:matricule',  (req,res,next) =>{
    let matricule = req.params.matricule;
    let date_rapport = req.body.date_rapport;
    let objet = req.body.objet;
    let contenu = req.body.contenu_rapport;
    let situation = req.body.situation_rapport;
  
        if ( date_rapport || objet || contenu || situation)
            {
                connection.query('UPDATE rapport SET DATE_RAPPORT=? ,OBJET=? ,CONTENU_RAPPORT=? ,SITUATION_RAPPORT=? WHERE MATRICULE_AGENT=?', [date_rapport,objet,contenu,situation,matricule], (err, resultat) =>{

                    if(!err){
                            res.status(200).json({message : "Modification reussi!"});
                    }else{
                        res.status(500).json(err);
                    }
                });
        }else{
                res.status(400).json({message : "Completer tout les champs!"});
            }
    });

    


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* MODIFICATION DANS LA TABLE RAPPORT */

router.post('/update',  (req,res,next) =>{
    let id_rapport = req.body.id;
    const situation_vu = "vu"
        if (id_rapport)
            {
                connection.query('UPDATE rapport SET SITUATION_RAPPORT=? WHERE ID_RAPPORT =?', [situation_vu, id_rapport], (err, resultat) =>{
                    if(!err){
                            res.status(200).json({message : "Modification reussi!"});
                    }else{
                        res.status(500).json(err);
                    }
                });
        }else{
                res.status(400).json({message : "Completer tout les champs!"});
            }
    });

    
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* DELETE D'UN CONTENU DE LA TABLE RAPPORT */

router.delete('/delete/:matricule', (req, res) =>{
    let matricule = req.params.matricule;
    if(matricule)
    {
            connection.query("DELETE FROM rapport WHERE MATRICULE_AGENT=?", [matricule], (err, resultat) =>{
            if(!err){
                res.status(200).json({message : "Supprime!"});
            }else{
                res.status(500).json({message :"Echec de la suppression"});
            }
        });
    }else{
        res.status(403).json({message : "!"});
    }
});


module.exports = router;
