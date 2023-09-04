const express = require("express");
const connection = require("../connection");
const router = express.Router();

// --------------------------------------------------------------------------------------------------------------------------------------

//affichage "mandeha !"
router.get("/afficherAgent", (req , res, next) => {
    var requet = "SELECT * FROM agent";
    connection.query(requet ,(erreur , resultat) => {
        
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
});

router.get("/afficherAgent/service/:service", (req , res, next) => {
    var service = req.params.service;
    var requet = "SELECT * FROM agent WHERE SERVICE = ?";
    connection.query(requet, [service] ,(erreur , resultat) => {
        
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
});

//afficher un seul agent
router.get("/afficherAgent/:id", (req , res, next) => {
    let id = req.params.id;
    var requet = "SELECT * FROM agent WHERE ID_AGENT = ?";
    connection.query(requet, [id] ,(erreur , resultat) => {

        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            return res.status(200).json(resultat);
        }
       
    });
});

//afficher info enfant
router.get("/afficherAgent/enfant/:id", (req , res, next) => {
    let id = req.params.id;
    var requet = "SELECT * FROM enfant WHERE MATRICULE_AGENT = ?";
    connection.query(requet, [id] ,(erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            return res.status(200).json(resultat);
        }
    });
});

// --------------------------------------------------------------------------------------------------------------------------------------

//creer "mandeha !" 
router.post("/creerAgent", (req, res, next) => {
    var data = req.body; 

    // if (data.im && data.nom && data.prenoms && data.sexe && data.datenaiss && data.lieunaiss && data.adresse && data.cin && data.datecin && data.lieucin && data.indice && data.dateadministration && data.lieutravail && data.typeagent && data.pere && data.mere && data.etatmatrimonial && data.adresseurgent && type_service) 
    // {
    //donnees essentiel
        var im = data.im.toUpperCase(); 
        var nom = data.nom; 
        var prenoms = data.prenoms; 
        var sexe = data.sexe; 
        var datenaiss = data.datenaiss; 
        var lieunaiss = data.lieunaiss;
        var adresse = data.adresse; 
        var cin = data.cin;
        var datecin = data.datecin;
        var lieucin = data.lieucin;
        var indice = data.indice;
        var dateadministration = data.dateadministration;
        var lieutravail = data.lieutravail;
        var pere = data.pere;
        var mere = data.mere;
        var etatmatrimonial = data.etatmatrimonial;
        var adresseurgent = data.adresseurgent;
        var aptitudespecial = data.aptitudespecial;
        var distictionhonorifique = data.distictionhonorifique;
        var tel = data.tel;
        var fonction = data.fonction;
        var epoux_se = data.epoux_se;
        var pereEpoux_se = data.pereEpoux_se;
        var mereEpoux_se =  data.mereEpoux_se;  
        var nb_enfant = Number(data.nb_enfant);  
        var nb_enfant_charge = Number(data.nb_enfant_charge);
        var type_service = data.type_service;
        var photo = data.photo;
        var type_agent = data.type_agent;
        var statut_presence = data.statut_presence;

        var requete_0 = 'INSERT INTO agent(IM, NOM, PRENOMS, SEXE, DATE_NAISS, LIEU_NAISS, ADRESSE, CIN, DATE_CIN, LIEU_CIN, INDICE, DATE_ENTREE_ADMINISTRATION, LIEU_TRAVAIL, PERE_AGENT, MERE_AGENT, ETAT_MATRIMONIAL, ADRESSE_URGENT, APTITUDE_SPECIAL, DISTINCTION_HONORIFIQUE, EPOUX_SE_, PERE_EPOUX_SE_, MERE_EPOUX_SE_, NOMBRE_ENFANT, NOMBRE_ENFANT_CHARGE, SERVICE, TELEPHONE, FONCTION, PHOTO, TYPE_AGENT, STATUT_PRESENCE) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

        if(im && nom){

        connection.query(requete_0, [im, nom, prenoms, sexe, datenaiss, lieunaiss, adresse, cin, datecin, lieucin, indice, dateadministration, lieutravail, pere, mere, etatmatrimonial, adresseurgent, aptitudespecial, distictionhonorifique, epoux_se, pereEpoux_se, mereEpoux_se, nb_enfant, nb_enfant_charge, type_service, tel, fonction, photo, type_agent, statut_presence], (erreur, resultat) => {
            if (!erreur) {
                return res.status(200).json({message : 'Enregistrement réussi !'}); 
            }
            else {
                return res.status(500).json({message : "Erreur d'enregistrement"});
            }
        });
    }else{
        return res.status(500).json({message : "Veuillez bien remplir les champs"});
    }    
});
        
// --------------------------------------------------------------------------------------------------------------------------------------

//insert Fonction "mandeha !"
router.post("/insertFonction", (req, res, next) => {
    var data = req.body;

    var fonction = data.fonction;
    var matricule = data.matricule;

    if (data.fonction) {
        var requete_4 = 'INSERT INTO fonction(TYPE_FONCTION, MATRICULE_AGENT) VALUES(?,?)';

        connection.query(requete_4, [fonction, matricule], (erreur, resultat) => {
            if (!erreur) {
                console.log(resultat);
                res.status(200).json({message : 'Tafiditra daholo ny fonction eh ! '});
            }
            else {
                return res.status(500).json(erreur);
            }
        }); 
    }
});

// --------------------------------------------------------------------------------------------------------------------------------------

//update "mande ah !"
router.post("/updateAgent/:id", (req, res, next) => {
    
    var data = req.body;
    var id = data.id;
    var im = data.im; 
    var nom = data.nom; 
    var prenoms = data.prenoms; 
    var sexe = data.sexe; 
    var datenaiss = data.datenaiss; 
    var lieunaiss = data.lieunaiss;
    var adresse = data.adresse; 
    var cin = data.cin;
    var datecin = data.datecin;
    var lieucin = data.lieucin;
    var indice = data.indice;
    var dateadministration = data.dateadministration;
    var lieutravail = data.lieutravail;
    var pere = data.pere;
    var mere = data.mere;
    var etatmatrimonial = data.etatmatrimonial;
    var adresseurgent = data.adresseurgent;
    var aptitudespecial = data.aptitudespecial;
    var distictionhonorifique = data.distictionhonorifique;
    var tel = data.tel;
    var fonction = data.fonction;
    var epoux_se = data.epoux_se;
    var pereEpoux_se = data.pereEpoux_se;
    var mereEpoux_se =  data.mereEpoux_se;  
    var nb_enfant = Number(data.nb_enfant);  
    var nb_enfant_charge = Number(data.nb_enfant_charge);
    var type_service = data.type_service;
    var photo = data.photo;
    var type_agent = data.type_agent;
    var statut_presence = data.statut_presence;

    var requete = 'UPDATE agent SET IM=?, NOM=?, PRENOMS=?, SEXE=?, DATE_NAISS=?, LIEU_NAISS=?, ADRESSE=?, CIN=?, DATE_CIN=?, LIEU_CIN=?, INDICE=?, DATE_ENTREE_ADMINISTRATION=? , LIEU_TRAVAIL=?, PERE_AGENT=?, MERE_AGENT=?, ETAT_MATRIMONIAL=?, ADRESSE_URGENT=?, APTITUDE_SPECIAL=?, DISTINCTION_HONORIFIQUE=?, EPOUX_SE_=?, PERE_EPOUX_SE_=?, MERE_EPOUX_SE_=?, NOMBRE_ENFANT=?, NOMBRE_ENFANT_CHARGE=?, FONCTION=?, TELEPHONE= ?, SERVICE=?, PHOTO=?, TYPE_AGENT=?, STATUT_PRESENCE=? WHERE ID_AGENT = ?';

    if(nom){

        
        connection.query(requete, [im, nom, prenoms, sexe, datenaiss, lieunaiss, adresse, cin, datecin, lieucin, indice, dateadministration, lieutravail, pere, mere, etatmatrimonial, adresseurgent, aptitudespecial, distictionhonorifique, epoux_se, pereEpoux_se, mereEpoux_se, nb_enfant, nb_enfant_charge, fonction, tel, type_service, photo, type_agent, statut_presence, id], (erreur, resultat) => {
            
            if (!erreur) {
                return res.status(200).json({message : "Modification réussi"});
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