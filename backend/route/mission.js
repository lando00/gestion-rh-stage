const express = require('express');
const connection = require('../connection');
const router = express.Router(); 


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* INSERTION DANS LA TABLE MISSION */

router.post('/create',  (req,res,next) =>{
    var tab_agent = req.body.agents;

    if (req.body.ordre && req.body.debut && req.body.fin && req.body.retour && req.body.motif && req.body.lieu)
        {                                
                if (tab_agent)
                {
                    tab_agent.map( agent =>{
                        let im = agent.im;
                        let prenoms = agent.prenoms;
                        let ordre = req.body.ordre;
                        let debut = req.body.debut;
                        let fin = req.body.fin;
                        let retour = req.body.retour;
                        let motif = req.body.motif;
                        let lieu = req.body.lieu;

                        connection.query('INSERT INTO mission(MATRICULE_AGENT, PRENOMS, ORDRE_MISSION, DEBUT_MISSION, FIN_MISSION, DATE_RETOUR, MOTIF_MISSION, LIEU_MISSION) VALUES (?,?,?,?,?,?,?,?)' , [im,prenoms,ordre,debut,fin,retour,motif,lieu], (err, resultat) =>{
                            if(new Date(debut) <= new Date()){
                                connection.query("UPDATE agent SET STATUT_PRESENCE ='en mission' WHERE IM=? ",[agent.im], (err, resultat) =>{})
                            }
                        })
                    })
                    res.status(200).json({message:'La creation de la mission a été effectué avec succès'})
                }

        }
    else{
            res.status(400).json({message : "Completer tout les champs!"});
        }
});



//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE DU CONTENU DANS LA TABLE MISSION */

router.get('/liste', (req, res, next) => {
    var requete = 'SELECT * FROM mission';
    connection.query(requete, (err, resultat) => {
        if (!err) {
            res.status(200).json(resultat);
        }
        else {
            res.status(400).json({message : "Erreur"});
        }
    });
});


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* MODIFICATION DANS LA TABLE MISSION */

router.patch('/update/:ordre_mission',  (req,res,next) =>{
    let ordre_mission = req.params.ordre_mission;

    let debut = req.body.debut;
    let fin = req.body.fin;
    let retour = req.body.retour;
    let motif = req.body.motif;
    let lieu = req.body.lieu;

    if (debut || fin || retour || motif || lieu)
        {
            connection.query("UPDATE mission SET DEBUT_MISSION=? ,FIN_MISSION=? ,DATE_RETOUR=? ,MOTIF_MISSION=? ,LIEU_MISSION=? WHERE ORDRE_MISSION=? ", [debut,fin,retour,motif,lieu,ordre_mission], (err, resultat) =>{
                if(!err){
                        res.status(200).json({message :"Modification reussi"});
                    }
                else{
                        res.status(500).json({message :"Echec de la modification"});
                    }
                })
        }                        
    else{
            res.status(400).json({message : "Completer tout les champs!"});
        }
});



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* DELETE D'UN CONTENU DE LA TABLE MISSION */

router.delete('/delete/:id_mission', (req, res) =>{
    let id_mission = req.params.id_mission;
    if(id_mission)
    {
            connection.query("DELETE FROM mission WHERE ID_MISSION=?", [id_mission], (err, resultat) =>{
            if(!err){
                res.status(200).json({message : "Supprime!"});
            }else{
                res.status(500).json({message :"Echec de la suppression"});
            }
        });
    }else{
        res.status(403).json({message : "!"});
    }
    //connection.end();
});



module.exports = router;