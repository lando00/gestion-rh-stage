const express = require("express");
const connection = require("../connection");
const router = express.Router();

//affichage avancement d'un agent "ESPACE CLIENT A REVISER"
// router.get('/afficherAvancementUser/:matricule', (req, res, next) => { 
//     var matricule = req.params.matricule;

//     var requet = 'SELECT * FROM avancement WHERE  MATRICULE_AGENT = ?';

//     //time zone
//     // const anneeActu = new Date().getFullYear('en-MG', {timeZone : 'Indian/Antananarivo'}) + '-' + new Date().getHours('en-MG', {timeZone : 'Indian/Antananarivo'}) + '-' + new Date().getDate('en-MG', {timeZone : 'Indian/Antananarivo'});
//     // console.log(anneeActu + 'time zone');

//     const date_machine = new Date();
//     var date_actu = date_machine.getFullYear() + '-' + date_machine.getHours() + '-' + date_machine.getDate();
//     console.log(date_actu + ' date actu');
    
//     if(matricule) {
//         connection.query(requet, [matricule], (erreur, resultat) => {
//             if (!erreur) {
//                 res.status(200).json(resultat);
//                 date_expiration_grade = resultat[0].DATE_EXPIRATION_DRADE;
//                 console.log(date_expiration_grade + '/n'); 
//                 var annemoijour_grade = new Date(date_expiration_grade);
//                 var date_normal_grade = annemoijour_grade.getFullYear() + '-' + annemoijour_grade.getMonth() + '-' + annemoijour_grade.getDate();
//                 console.log(date_normal_grade + ' => date normal grade');

//                 date_expiration_grille = resultat[0].DATE_EXPIRATION_GRILLE;
//                 var annemoijour_grille = new Date(date_expiration_grille);
//                 var date_normal_grille = annemoijour_grille.getFullYear() + '-' + annemoijour_grille.getMonth() + '-' + annemoijour_grille.getDate();
//                 console.log(date_normal_grille + ' => date normal grille');

//                 //hausse grade
//                 if (date_normal_grade > date_actu) {
//                     console.log('Hausse du grade');
//                 }
                
//                 //hausse grille
//                 if (date_normal_grille > date_actu) {
//                     console.log('Hausse du grille');
//                 }
//             }
//             else {
//                 return res.status(200).json({message : 'ERREUR SERVER'});
//             }
//         });
//     }
//     else {
//         return res.status(404).json({message : 'DONNEES INTROUVABLE'});
//     }
// });

//----------------------------------------------------------------------------------------------------------------

//insertion avancement d'un agent "mande ah"
router.post('/insertAvancement', (req, res) => {
    var data = req.body;

    var corps = data.corps;
    var grade = data.grade;
    var grille = data.grille;
    var date_initial_grade = data.date_initial_grade;
    var date_initial_grille = data.date_initial_grille;
    var date_expiration_grade = data.date_expiration_grade;
    var date_expiration_grille = data.date_expiration_grille;
    var matricule = data.matricule.toUpperCase();
    
    var requete = 'INSERT INTO avancement(CORPS, GRADE, GRILLE, DATE_INITIAL_GRADE, DATE_INITIAL_GRILLE, DATE_EXPIRATION_GRADE, DATE_EXPIRATION_GRILLE, MATRICULE_AGENT) VALUES (?,?,?,?,?,?,?,?)';
    if(corps && grade && grille && date_initial_grade && date_initial_grille && date_expiration_grade && date_expiration_grille && matricule){

        connection.query(requete, [corps, grade, grille, date_initial_grade, date_initial_grille, date_expiration_grade, date_expiration_grille, matricule], (erreur, resultat) => {
            if(!erreur) {
                return res.status(200).json({message : 'Enregistrement reussi !'});
            } 
            else {
                return res.status(500).json({message : 'ERREUR SERVER'});
            }
        });
    }else{
        return res.status(500).json({message : "Veuillez bien remplir les champs"});
    }
});

//afficher avancement
router.get('/afficherAvancementUser/:matricule', (req, res, next) => {

    var matricule = req.params.matricule;

    var requet = 'SELECT * FROM avancement WHERE  MATRICULE_AGENT = ?';
    connection.query(requet, [matricule], (erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            return res.status(200).json(resultat);
        }
    })
});

//modifier avancement
router.post('/updateAvancement/:id', (req, res, next) => {
    var data = req.body;

    var corps = data.corps;
    var grade = data.grade;
    var grille = data.grille;
    var date_initial_grade = data.date_initial_grade;
    var date_initial_grille = data.date_initial_grille;
    var date_expiration_grade = data.date_expiration_grade;
    var date_expiration_grille = data.date_expiration_grille;
    var matricule = data.matricule.toUpperCase();
    var idAvancement = data.idAvancement;

    var requete = 'UPDATE avancement SET CORPS=?, GRADE=?, GRILLE=?, DATE_INITIAL_GRADE=?, DATE_INITIAL_GRILLE=?, DATE_EXPIRATION_GRADE=?, DATE_EXPIRATION_GRILLE=? WHERE ID_AVANCEMENT=?';
    if(corps && grade && grille && date_initial_grade && date_initial_grille && date_expiration_grade && date_expiration_grille && matricule){

        connection.query(requete, [corps, grade, grille, date_initial_grade, date_initial_grille, date_expiration_grade, date_expiration_grille, idAvancement], (erreur, resultat) => {
            if(!erreur) {
                return res.status(200).json({message : 'Modification reussi'});
            }
            else {
                return res.status(500).json({message : 'Erreur de modification'});
            }
        });
    }else{
        return res.status(500).json({message : 'Veuillez bien remplir les champs'});
    }
});



module.exports = router;   