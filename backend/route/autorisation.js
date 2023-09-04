const express = require('express');
const connection = require('../connection');
const router = express.Router(); 


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE TOUT DU CONTENU DANS LA TABLE AUTORISATION SANS EXCEPTION */

router.get("/liste", (req, res, next) =>{
    var sql = "SELECT * FROM autorisation";

        connection.query(sql, (err, resultat) =>{
            if(!err){
                res.status(200).json(resultat);
            }
            else{
                res.status(400).json({message : "Erreur"});
            }
        });

});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE TOUT DU CONTENU DANS LA TABLE AUTORISATION POUR LE SUPER ADMIN */

router.get("/liste/:type_agent", (req, res, next) =>{
    let type_agent = req.params.type_agent;
    var sql_superAdmin = "SELECT * FROM autorisation";

    if(type_agent === "Superadmin")
        {
            connection.query(sql_superAdmin, (err, resultat) =>{
                if(!err){
                    res.status(200).json(resultat);
                }
                else{
                    res.status(400).json({message : "Erreur"});
                }
            });
        }
    else{
        res.status(503).json({message : "Vous n'etes pas autorise pour effectuer cette action"})
        }
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE TOUT DU CONTENU DANS LA TABLE AUTORISATION POUR L'ADMIN */

router.get("/liste/:type_agent/:type_service", (req, res, next) =>{
    let type_agent = req.params.type_agent;
    let type_service = req.params.type_service;
    
    var sql_chef = "SELECT * FROM autorisation WHERE TYPE_SERVICE=? ";

    if(type_agent === "Admin" && type_service)
        {
            connection.query(sql_chef, [type_service], (err, resultat) =>{
                if(!err){
                    res.status(200).json(resultat);
                }
                else{
                    res.status(400).json({message : "Erreur"});
                }
            });
        }
    else{
        res.status(503).json({message : "Vous n'etes pas autorise pour effectuer cette action"})
        }
});


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE TOUT DU CONTENU DANS LA TABLE AUTORISATION POUR L'UTILISATEUR' */


router.get('/liste/:type_agent/:matricule_agent', (req, res, next) =>{
    let type_agent = req.params.type_agent;
    let matricule_agent = req.params.matricule_agent;
    
    var sql_utilisateur = "SELECT * FROM autorisation WHERE MATRICULE_AGENT=? ";
    
    if(type_agent === "Utilisateur" && matricule_agent)
        {
            connection.query(sql_utilisateur, [matricule_agent], (err, resultat) =>{
                if(!err){
                    res.status(200).json(resultat);
                }
                else{
                    res.status(400).json({message : "Erreur"});
                }
            });
        }
    else{
        res.status(503).json({message : "Vous n'etes pas autorise pour effectuer cette action"})
        }
    
});


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* MODIFICATION DANS LA TABLE AUTORISATION POUR L'ADMIN*/

router.patch('/update/:id',  (req,res,next) =>{
    let id = req.params.id;

    let debut_autorisation = req.body.debut_autorisation; 
    let fin_autorisation = req.body.fin_autorisation;
    let duree_autorisation = req.body.duree_autorisation; 
    let reprise_de_service = req.body.reprise_de_service; 
    let lieu_jouissance = req.body.lieu_jouissance;
    let etat_autorisation = req.body.etat_autorisation;
    let type_service = req.body.type_service;

   
        if (debut_autorisation || fin_autorisation || duree_autorisation || lieu_jouissance || reprise_de_service || etat_autorisation || type_service)
        {
                connection.query("UPDATE autorisation SET DEBUT_AUTORISATION=? ,FIN_AUTORISATION=? ,DUREE_AUTORISATION=? ,REPRISE_DE_SERVICE=? ,LIEU_JOUISSANCE=? ,ETAT_AUTORISATION=? ,TYPE_SERVICE=?  WHERE ID_AUTORISATION=?", [debut_autorisation,fin_autorisation,duree_autorisation,reprise_de_service,lieu_jouissance,etat_autorisation,type_service], (err, resultat) =>{
                    if(!err){
                    res.status(200).json({message : "Modification reussi!"});
                }else{
                    res.status(500).json({message :"Echec de la modification"});
                }
            });
        }else{
            res.status(403).json({message : "Completer tout les champs!"});
        }

});

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* DELETE D'UN CONTENU DE LA TABLE AUTORISATION */

router.delete('/delete/:id', (req, res) =>{
    let id = req.params.id;
    if(id)
    {
            connection.query("DELETE FROM autorisation WHERE ID_AUTORISATION=?", [id], (err, resultat) =>{
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

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


module.exports = router;