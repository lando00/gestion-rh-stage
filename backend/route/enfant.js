const express = require('express');
const connection = require('../connection');
const router = express.Router();

//ajouter enfant "ESPACE ADMIN"
router.post('/ajoutEnfant', (req, res, next) => {
    var data = req.body;
    
    var nomEnfant = data.nomEnfant;
    var dateNaissEnfant = data.dateNaissEnfant;
    var sexeEnfant = data.sexeEnfant;
    var matriculeAgent = data.matriculeAgent.toUpperCase();

    var requete = 'INSERT INTO enfant(NOM_ENFANT, DATE_NAISS_ENFANT, SEXE_ENFANT, MATRICULE_AGENT) VALUES(?,?,?,?)';
    if(nomEnfant && dateNaissEnfant && sexeEnfant && matriculeAgent){
    connection.query(requete, [nomEnfant, dateNaissEnfant, sexeEnfant, matriculeAgent], (erreur, resultat) => {
        if(!erreur) {
            return res.status(200).json({message : 'Enregistrement reussi !'});
        }
        else {
            return res.status(500).json({message : "Erreur d'enregistrement"});
        }
    });
    }else{
        return res.status(500).json({message : "Veuillez bien remplir les champs"});
    }
});

router.post('/updateEnfant/:id', (req, res, next) => {
    var data = req.body;
    var idEnfant = data.idEnfant;
    var nomEnfant = data.nomEnfant;
    var dateNaissEnfant = data.dateNaissEnfant;
    var sexeEnfant = data.sexeEnfant;
    var matriculeAgent = data.matriculeAgent.toUpperCase();

    var requete = 'UPDATE enfant SET NOM_ENFANT=?, DATE_NAISS_ENFANT=?, SEXE_ENFANT=?, MATRICULE_AGENT=? WHERE ID_ENFANT=?';
    if(nomEnfant && dateNaissEnfant && sexeEnfant && matriculeAgent){

        connection.query(requete, [nomEnfant, dateNaissEnfant, sexeEnfant, matriculeAgent, idEnfant], (erreur, resultat) => {
            if(!erreur) {
                return res.status(200).json({message : 'Modification reussi'});
            }
            else {
                return res.status(500).json({message : "Erreur de modification"});
            }
        });
    }else{
        return res.status(500).json({message : "Veuillez bien remplir les champs"});
    }
    });

module.exports = router;