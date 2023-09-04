const express = require("express");
const connection = require("../connection");
const router = express.Router();

//affichage avancement d'un agent "ESPACE CLIENT Mandeha !"
router.get('/afficherSuiviUser/:matricule', (req, res, next) => { 
    var matricule = req.params.matricule;
    var requet = 'SELECT * FROM suivi WHERE  MATRICULE_AGENT = ?';

    if(matricule) {
        connection.query(requet, [matricule], (erreur, resultat) => {
            if (!erreur) {
                return res.status(200).json(resultat);
            }
            else {
                return res.status(200).json({message : 'ERREUR SERVER'});
            }
        });
    }
    else {
        return res.status(404).json({message : 'DONNEES INTROUVABLE'});
    }
});

//----------------------------------------------------------------------------------------------------------------

//ajouter suivi "ESPACE ADMIN Mandeha !"
router.post('/insertSuivi', (req, res, next) => {
    var data = req.body;

    var diplome = data.diplome;
    var categorie = data.categorie;
    var mention = data.mention;
    var matricule = data.matricule.toUpperCase();

    var requete = 'INSERT INTO suivi(DIPLOME, CATEGORIE, METION, MATRICULE_AGENT) VALUES(?,?,?,?)';
    if(diplome && matricule){

   
    connection.query(requete, [diplome, categorie, mention, matricule], (erreur, resultat) => {
        if(!erreur) {
            return res.status(200).json({message : 'Enregistrement reussi !'});
        }
        else {
            return res.status(500).json({message : "Erreur d'enregistrement !"});
        }
    });
    }else{
        return res.status(500).json({message : "Veuillez bien remplir les champs"});
    }
});

module.exports = router;