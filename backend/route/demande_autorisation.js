const express = require('express');
const connection = require('../connection');
const router = express.Router(); 


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE DU CONTENU DANS LA TABLE DEMANDE AUTORISATION SANS EXCEPTION */

router.get('/liste', (req, res, next) => {
    var requete = 'SELECT * FROM demande_autorisation';
    connection.query(requete, (err, resultat) => {
        if (!err) {
            res.status(200).json(resultat);
        }
        else {
            res.status(400).json({message : "Erreur"});
        }
    });
});


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE TOUT DU CONTENU DANS LA TABLE AUTORISATION POUR LE SUPER ADMIN */

router.get("/liste/:type_agent", (req, res, next) =>{
    let type_agent = req.params.type_agent;
    var sql_superAdmin = "SELECT * FROM demande_autorisation";

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



//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE TOUT DU CONTENU DANS LA TABLE AUTORISATION POUR L'ADMIN */

router.get("/liste/:type_agent/:type_service", (req, res, next) =>{
    let type_agent = req.params.type_agent;
    let type_service = req.params.type_service;
    
    var sql_chef = "SELECT * FROM demande_autorisation WHERE TYPE_SERVICE=? ";

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


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE TOUT DU CONTENU DANS LA TABLE AUTORISATION POUR L'UTILISATEUR' */


router.get('/liste/:type_agent/:matricule_agent', (req, res, next) =>{
    let type_agent = req.params.type_agent;
    let matricule_agent = req.params.matricule_agent;
    
    var sql_utilisateur = "SELECT * FROM demande_autorisation WHERE MATRICULE_AGENT=? ";
    
    if(type_agent === "Utilisateur" && matricule_agent)
        {
            connection.query(sql_utilisateur, [matricule_agent], (err, resultat) =>{
                if(!err){
                    res.status(200).json(resultat);
                }
                else{
                    res.status(500).json({message : "Erreur"});
                }
            });
        }
    else{
        res.status(503).json({message : "Vous n'etes pas autorise pour effectuer cette action"})
        }
    
});



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* INSERTION DANS LA TABLE DEMANDE AUTORISATION*/

router.post('/create', (req,res,next) =>{
    let im_agent = req.body.matricule_agent;
    var today = new Date();
    var date_rapport = today.getFullYear() + "-" + parseInt(today.getMonth()+1) + "-" + today.getDate()
    var objet_rapport = "DEMANDE D'AUTORISATION"
    var contenu_rapport = "vous avez recu une nouvelle demande d'autorisation"
    var situation_rapport = "Nouvelle"
    var insertion_rapport = 'INSERT INTO rapport ( MATRICULE_AGENT, DATE_RAPPORT, OBJET, CONTENU_RAPPORT, SITUATION_RAPPORT) VALUES (? ,? ,? ,? ,? )'
    let SQL = 'SELECT STATUT_PRESENCE FROM agent WHERE IM=?';
    
            
            let prenoms = req.body.prenoms;
            let type_agent = req.body.type_agent;
            let im_responsable = req.body.IM_responsable;
            let date_debutA = req.body.debut_autorisation; 
            let date_finA = req.body.fin_autorisation;
            let duree_demander =  req.body.duree_autorisation; 
            let date_reprise = req.body.reprise_de_service;
            let lieu_de_jouissance = req.body.lieu_jouissance;
            let type_service = req.body.type_service;
            let raison = req.body.raison;
            let type_autorisation = req.body.type_autorisation;
            let etat_de_la_demande =  "Nouvelle";
            
            if(im_agent && prenoms && im_responsable && date_debutA && date_finA && duree_demander && date_reprise && lieu_de_jouissance && raison && type_autorisation && etat_de_la_demande && type_agent && type_service )
                {     
                    connection.query('INSERT INTO demande_autorisation(MATRICULE_AGENT, PRENOMS, IM_RESPONSABLE, DATE_DEBUTA, DATE_FINA, DUREE_DEMANDER, DATE_DE_REPRISE, LIEU_DE_JOUISSANCE, RAISON, TYPE_AUTORISATION, ETAT_DE_LA_DEMANDE, TYPE_AGENT, TYPE_SERVICE) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)' , [im_agent,prenoms,im_responsable,date_debutA,date_finA,duree_demander,date_reprise,lieu_de_jouissance,raison,type_autorisation,etat_de_la_demande,type_agent,type_service], (err, resultat) =>{
                        if(!err){
                            res.status(200).json({message : "Demande d'autorisation envoyée avec succès !"});
                            connection.query(insertion_rapport, [im_responsable, date_rapport, objet_rapport, contenu_rapport, situation_rapport], (erreur,resultat)=>{})
                        }else{
                            res.status(500).json({message : "une erreur venant du serveur s'est produite"});
                        }
                    });
                }
            else{
                res.status(404).json({message : "Completer tout les champs!"})
            }
    });


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* VALIDATION LA DEMANDE AUTORISATION */

router.post('/validation/:id_demandeA/:reponse', (req, res, next) => {
    var id_demandeA = req.params.id_demandeA;
    var reponse_validation = req.params.reponse;
    const acceptee = "Approuvée"
    const refusee = "Rejetée"
    const query_update_demande = 'UPDATE demande_autorisation SET ETAT_DE_LA_DEMANDE=? WHERE ID_DEMANDEA=?'
    const update_statu_agent = 'UPDATE agent SET `STATUT_PRESENCE` =? WHERE IM =?'


    const insertion_rapport = 'INSERT INTO `rapport`(`MATRICULE_AGENT`, `DATE_RAPPORT`, `OBJET`, `CONTENU_RAPPORT`, `SITUATION_RAPPORT`) VALUES (?, ?, ?, ? ,?)'
    const contenu_approuve = 'Votre demande d\'autorisation a été approuvée'
    const contenu_rejete = 'Votre demande d\'autorisation a été rejetée'
    const situation_rapport = 'Nouvelle'
    const objet_rapport = "DEMANDE D'AUTORISATION"
    var statut_agent_autorisation = "autorisation"

    var daty_androany = new Date()
    var date_test = daty_androany.getFullYear() + "-" +parseInt(daty_androany.getMonth()+1)+ "-"+ daty_androany.getDate()

            if(reponse_validation === "oui"){
                    
                        let im_agent = req.body.im_agent;
                        let prenoms = req.body.prenoms; 
                        let type_agent = req.body.type_agent;
                        let IM_responsable = req.body.IM_responsable;
                        let debut_autorisation = req.body.debut_autorisation; 
                        let fin_autorisation = req.body.fin_autorisation;
                        let duree_autorisation = req.body.duree_autorisation; 
                        let reprise_de_service = req.body.reprise_de_service; 
                        let lieu_jouissance = req.body.lieu_jouissance;
                        let type_service = req.body.type_service;
                        let etat_autorisation = "en cours";
    
                        if (im_agent && prenoms && type_agent && IM_responsable && debut_autorisation && fin_autorisation && duree_autorisation && reprise_de_service && lieu_jouissance && etat_autorisation && type_service )
                        {
                                connection.query('INSERT INTO autorisation(MATRICULE_AGENT, PRENOMS, TYPE_AGENT, IM_RESPONSABLE, DEBUT_AUTORISATION, FIN_AUTORISATION, DUREE_AUTORISATION, REPRISE_DE_SERVICE, LIEU_JOUISSANCE, ETAT_AUTORISATION, TYPE_SERVICE) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? )', 
                                [im_agent,prenoms,type_agent,IM_responsable,debut_autorisation,fin_autorisation,duree_autorisation,reprise_de_service,lieu_jouissance,etat_autorisation,type_service], (err, resultat) =>{
                                    if(!err){
                                    
                                    connection.query(query_update_demande, [acceptee, id_demandeA] , (err, resultat) =>{})
                                    //  const insertion_rapport = 'INSERT INTO `rapport`(`MATRICULE_AGENT`, `DATE_RAPPORT`, `OBJET`, `CONTENU_RAPPORT`, `SITUATION_RAPPORT`) VALUES (?, ?, ?, ? ,?)'
                                    connection.query(insertion_rapport, [im_agent, date_test, objet_rapport, contenu_approuve, situation_rapport], (err, resultat)=>{})
                                    if(new Date(debut_autorisation) <= new Date()){connection.query(update_statu_agent,[statut_agent_autorisation, im_agent],(erreur, resultat)=>{})}
                                    res.status(200).json({message : "Demande acceptée!"});
                                }else{
                                    res.status(500).json(err);
                                }
                            });
                        }else{
                            res.status(401).json({message : "Echec"});
                        }
            }
            else if(reponse_validation === "non"){
                let im_agent = req.body.im_agent;
                connection.query(query_update_demande, [refusee, id_demandeA] , (err, resultat) =>{})
                 //  const insertion_rapport = 'INSERT INTO `rapport`(`MATRICULE_AGENT`, `DATE_RAPPORT`, `OBJET`, `CONTENU_RAPPORT`, `SITUATION_RAPPORT`) VALUES (?, ?, ?, ? ,?)'
                 connection.query(insertion_rapport, [im_agent, date_test, objet_rapport, contenu_rejete, situation_rapport], (err, resultat)=>{})
                res.status(200).json({message : "Demande refusée"});
            }
        });

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* MODIFICATION DANS LA TABLE DEMANDE AUTORISATION */

router.patch('/update/:id',  (req,res,next) =>{
    let id = req.params.id;

    let date_debutA = req.body.date_debutA; 
    let date_finA = req.body.date_finA;
    let duree_demander =  req.body.duree_demander; 
    let date_reprise = req.body.date_reprise;
    let lieu_de_jouissance = req.body.lieu_de_jouissance;
    let raison = req.body.raison;
    let type_autorisation = req.body.type_autorisation;
    let etat_de_la_demande =  req.body.etat_de_la_demande;
    let type_agent = req.body.type_agent;
    let type_service = req.body.type_service;

    if (date_debutA || date_finA || duree_demander || date_reprise || lieu_de_jouissance || raison || type_autorisation || etat_de_la_demande || type_agent || type_service)
        {
            connection.query('UPDATE demande_autorisation SET DATE_DEBUTA=? ,DATE_FINA=? ,DUREE_DEMANDER=? ,DATE_DE_REPRISE=? ,LIEU_DE_JOUISSANCE=? ,RAISON=? ,TYPE_AUTORISATION=? ,ETAT_DE_LA_DEMANDE=? ,TYPE_AGENT=? ,TYPE_SERVICE=? WHERE ID_DEMANDEA=?' ,[date_debutA,date_finA,duree_demander,date_reprise,lieu_de_jouissance,raison,type_autorisation,etat_de_la_demande,type_agent,type_service,id], (err, resultat) =>{
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


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* DELETE D'UN CONTENU DE LA TABLE DEMANDE AUTORISATION */

router.delete('/delete/:id', (req, res) =>{
    let id = req.params.id;
    if(id)
    {
            connection.query("DELETE FROM demande_autorisation WHERE ID_DEMANDEA=?", [id], (err, resultat) =>{
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