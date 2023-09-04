const express = require('express');
const connection = require('../connection');
const router = express.Router();
const bcrypt = require("bcrypt");

//----------------------------------------------------------------------------------------------------------------

//creation login "MANDEHA !"
router.post('/creerlogin', (req, res, next) => {
    const saltRounds = 5; 
    var data = req.body;
    var motdepasse = data.motdepasse;
    var motdepasseconfirmer = data.motdepasseconfirmer;

    if (data.user && motdepasse && motdepasseconfirmer && data.matricule && data.cin) {

        var req = "SELECT * FROM agent WHERE IM = ? AND CIN = ? ";
        connection.query(req, [data.matricule, data.cin], (erreur, result) => {
            if(!erreur && result.length > 0){  
                
                if (motdepasse === motdepasseconfirmer) {
                    var requete = "INSERT INTO login(USER, MOT_DE_PASSE, MATRICULE_AGENT, CIN) VALUE (?,?,?,?)";
        
                    var motDePasseCrypter = '';
        
                    bcrypt.genSalt(saltRounds, (erreur , salf) => {
                        bcrypt.hash(motdepasse, salf, (erreur, result) => {
        
                            motDePasseCrypter = result;
        
                            var user = data.user;
                            var matricule = data.matricule
                            var cin = data.cin;
        
                            if(!erreur) {
                                connection.query(requete, [user, motDePasseCrypter, matricule, cin], (erreur, resultat) => {      
                                    if (!erreur) {
                                        return res.status(200).json({message : "Création du compte réussi"});
                                    }
                                    else {
                                        return res.status(500).json({message : "ERREUR SERVER"});
                                    }   
                                });
                            }
                            else {
                                return res.status(500).json({message : "ERREUR CRYPTAGE MOT DE PASSE"});
                            }
                        });
                    });
                }
                else {
                    return res.status(500).json({message : "Confirmé bien votre mot de passe"});
                }

            }else{
                return res.status(500).json({message : "Verifier bien votre matricule et cin"});
            }
        })
    }
    else {
        return res.status(500).json({message : "Completer tous les champs"});
    }
});

//----------------------------------------------------------------------------------------------------------------

//LOG IN "A ESSAYER"
router.post('/login', (req, res, next) => {
    var donnee = req.body;

    var user = donnee.user;
    var motdepasse = donnee.motdepasse;

    var requete = "SELECT MOT_DE_PASSE, MATRICULE_AGENT, USER FROM login WHERE USER = ?";

    var motDePasseRecuperer = '';

    if (user && motdepasse) {
        connection.query(requete, [user] ,(erreur , resultat) => {
            if (!erreur && resultat.length > 0 ) {
                motDePasseRecuperer = resultat[0].MOT_DE_PASSE; 
                var matricule = resultat[0].MATRICULE_AGENT;
               
                bcrypt.compare(motdepasse, motDePasseRecuperer, (erreur, reponce) => {
                 
                    if (reponce === true) {

                        var requete_0 = "SELECT agent.ID_AGENT, agent.PRENOMS, agent.PHOTO, agent.STATUT_PRESENCE, agent.TYPE_AGENT, agent.SERVICE, login.USER, login.MATRICULE_AGENT FROM agent, login WHERE agent.IM = login.MATRICULE_AGENT AND MATRICULE_AGENT = ?";
                        connection.query(requete_0, [matricule], (erreur, resultat_0) => {
                            if(!erreur) { 
                                // Avancement
                                
                                var session = resultat_0; 
                                var requet = 'SELECT * FROM avancement WHERE  MATRICULE_AGENT = ?';
                                
                                //time zone
                                // const anneeActu = new Date().getFullYear('en-MG', {timeZone : 'Indian/Antananarivo'}) + '-' + new Date().getHours('en-MG', {timeZone : 'Indian/Antananarivo'}) + '-' + new Date().getDate('en-MG', {timeZone : 'Indian/Antananarivo'});
                                // console.log(anneeActu + 'time zone');
                            
                                const date_machine = new Date();
                                
                                
                                if(matricule) {
                                    connection.query(requet, [matricule], (erreur, resultat) => {
                                        if (!erreur) {
                                            if (resultat.length > 0) {
                            
                                                var tableau_resultat = resultat;
                            
                                                var length = tableau_resultat.length - 1;
                                               
                            
                                                var dernier_elem_table = tableau_resultat[length];
                            
                                                var date_expiration_grade = dernier_elem_table.DATE_EXPIRATION_GRADE;
                                                var date_expiration_grille = dernier_elem_table.DATE_EXPIRATION_GRILLE

                                
                                
                                                if (date_machine >= date_expiration_grade) {
                                                    return res.status(200).json({session, message : "Votre grade est expiré"});
                                                }
                                                else if (date_machine >= date_expiration_grille) {
                                                    return res.status(200).json({session, message : "Votre grille est expiré"});
                                                }
                                                else {

                                                    return res.status(200).json({session, message : ""});
                                                }   
                                            }else{
                                                return res.status(200).json({session, message : ""});
                                            }
                                        }
                                        else {
                                            return res.status(200).json({message : 'ERREUR SERVER'});
                                        }
                                    });
                                }
                                else {
                                    return res.status(404).json({message : 'DONNEES INTROUVABLE'});
                                }
                                //return res.status(500).json(resultat_0);
                            }
                            else {
                                return res.status(500).json(erreur);
                            }
                        });
                    }
                    else {
                        return res.status(500).json({message : "Mot de passe incorrect"});
                    }
                });   
            }
            else {
                return res.status(500).json({message : "Verifier votre nom d'utilisateur"});
            }
        })
    }
    else {
        return res.status(403).json({message : "Completer tous les champs"});
    }
});

//----------------------------------------------------------------------------------------------------------------

//changer mot de passe "MANDEHA !"
router.post("/changeMotDePasse/:id", (req , res) => {
    const id = req.params.id;
    var motdepasse = req.body.motdepasse;
    let motdepasseconfirmer = req.body.motdepasseconfirmer;
    const saltRounds = 5;

    if (id && motdepasseconfirmer) {
        if (motdepasse === motdepasseconfirmer) {
            var requete = "UPDATE login SET MOT_DE_PASSE = ? WHERE MATRICULE_AGENT  = ?";

            var motDePasseCrypter = '';

            bcrypt.genSalt(saltRounds, (erreur , salf) => {
                bcrypt.hash(motdepasse, salf, (erreur, result) => {

                    motDePasseCrypter = result;

             

                    if (!erreur) {
                        connection.query(requete, [motDePasseCrypter, id], (erreur, resultat) => {      
                            if (!erreur) {
                                return res.status(200).json({message : "Modification mot de passe reussi"});
                            }
                            else {
                                return res.status(500).json({message : "ERREUR SERVER"});
                            }   
                        });
                    }
                    else {
                        return res.status(502).json({message : "ERREUR CRYPTAGE MOT DE PASSE"});
                    }
                });
            });
        }
        else {
            return res.status(500).json({message : "Confirmer bien votre mot de passe"});
        }
    }
    else {
        return res.status(500).json({message : "Completer bien les champs"});
    }
});

//----------------------------------------------------------------------------------------------------------------

//oublier mot de passe "MANDEHA !"
router.post('/oublierMotDePasse', (req, res) => {
    var donnee = req.body;

    var user = donnee.user;
    var matricule = donnee.matricule;
    var cartIdNat = donnee.cartIdNat;

    var requete = 'SELECT * FROM login WHERE USER = ? AND MATRICULE_AGENT = ? AND CIN = ?';

    if (user  && matricule && cartIdNat) {
        connection.query(requete, [user, matricule, cartIdNat], (erreur, resultat) => {
            if (!erreur && resultat.length > 0) {
                return res.status(200).json({message : "VALIDE", resultat});
            }
            else {
                return res.status(500).json({message : "Votre compte n'existe pas"});
            }
        });
    }
    else {
        return res.status(500).json({message : "Veuillez bien remplir tous les champs"});
    }
});

//nouveau mot de passe "MANDEHA !"
router.post('/nouveauMotDePasse/:matricule', (req, res) => {
    var donnee = req.body;
    var matricule = req.params.matricule;
    var nouveaumotdepasse = donnee.nouveaumotdepasse;
    var confirmernouveaumotdepasse = donnee.confirmernouveaumotdepasse;

    const saltRounds = 5;

    var requete = 'UPDATE login SET MOT_DE_PASSE = ? WHERE MATRICULE_AGENT = ?';

    if (nouveaumotdepasse && confirmernouveaumotdepasse) {
        if (nouveaumotdepasse === confirmernouveaumotdepasse) {
            var motDePasseCrypter = '';

            bcrypt.genSalt(saltRounds, (erreur , salf) => {
                bcrypt.hash(nouveaumotdepasse, salf, (erreur, result) => {

                    motDePasseCrypter = result;
        
                    if (!erreur) {
                        connection.query(requete, [motDePasseCrypter, matricule], (erreur, resultat) => {      
                            if (!erreur) {
                                return res.status(200).json({message : "Modification mot de passe reussi"});
                            }
                            else {
                                return res.status(500).json({message : "ERREUR SERVER"});
                            }   
                        });
                    }
                    else {
                        return res.status(500).json("ERREUR CRYPTAGE MOT DE PASSE");
                    }
                });
            });
        }
        else {
            return res.status(500).json({message : "Confirmer bien votre mot de passe"});
        }
    }
    else {
        return res.status(500).json({message : "Veuillez bien remplir les champs"});
    }

});

module.exports = router;
/*    
    200 : succès de la requête ;
    301 et 302 : redirection, respectivement permanente et temporaire ;
    401 : utilisateur non authentifié ;
    403 : accès refusé ;
    404 : ressource non trouvée ;
    500, 502 et 503 : erreurs serveur ;
    504 : le serveur n'a pas répondu.
*/ 
//host: DIRPTDNFIANARA password: pTdN301Fia

//mtrcl , type, status , srvc

//GMAIL => tsioriniainajudhyo@gmail.com