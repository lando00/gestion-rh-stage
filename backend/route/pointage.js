const express = require('express');
const connection = require('../connection');
const router = express.Router(); 


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* AFFICHAGE DU CONTENU DANS LA TABLE POINTAGE */

router.get('/view', (req, res, next) =>{
    var sql = 'SELECT * FROM pointage';

    connection.query(sql, (err, resultat) =>{
        if(!err){
            res.status(200).json(resultat);
        }
        else{
            console.log(err);
        }
    });
});





//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// creation
router.post('/create', (req, res, next) =>{
    var IM = req.body.IM
    var PRENOMS = req.body.PRENOMS
    var SERVICE = req.body.TYPE_SERVICE
    var arrivee = req.body.heure_arrivee
    var splited = arrivee.split(":")
    var daty_androany = new Date()
    var limit_matin = new Date(0, 0, 0, 8, 30, 0)
    var limit_midi = new Date(0, 0, 0, 14, 30, 0)
    var test = new Date(0, 0, 0, 12, 0, 0)
    var date_test = daty_androany.getFullYear() + "-" +parseInt(daty_androany.getMonth()+1)+ "-"+ daty_androany.getDate()
    // var date_test = '2023-01-16'
    var verification_matin = 'SELECT `TIME_AM` FROM `pointage` WHERE `MATRICULE_AGENT` =? AND `DATE_POINTAGE` =?';
    var verification_midi = 'SELECT `TIME_PM` FROM `pointage` WHERE `MATRICULE_AGENT` =? AND `DATE_POINTAGE` =?';
    var update_heur_matin = 'UPDATE `pointage` SET `TIME_AM`=?,`RETARD_AM`=?,`RETARD`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
    var update_heur_midi = 'UPDATE `pointage` SET `TIME_PM`=?,`RETERD_PM`=?,`RETARD`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
    var matin_ponctuel = 'UPDATE `pointage` SET `TIME_AM`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
    var midi_ponctuel = 'UPDATE `pointage` SET `TIME_PM`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
    var retard_gle = 'SELECT `RETARD` FROM `pointage` WHERE `MATRICULE_AGENT`= ? AND `DATE_POINTAGE`=?'
    var midi_sans_matin = 'UPDATE `pointage` SET `TIME_PM`=?,`RETERD_PM`=?,`RETARD`=? WHERE `MATRICULE_AGENT` =? AND `DATE_POINTAGE`=?'
    var insertion_rapport = 'INSERT INTO `rapport`(`MATRICULE_AGENT`, `DATE_RAPPORT`, `OBJET`, `CONTENU_RAPPORT`, `SITUATION_RAPPORT`) VALUES (?, ?, ?, ?, ?)'
    var contenu_rapport = (parametre)=>"vous avez "+parametre.split(":")[0]+" heures " + parametre.split(":")[1]+"miutes de retard"
    var objet_rapport = 'RETARD'
    var situation_rapport = 'nouvelle'

    var verification_fiche = 'SELECT * FROM `pointage` WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE`=?'
    var creation_fiche = 'INSERT INTO `pointage`(`MATRICULE_AGENT`, `PRENOMS`, `DATE_POINTAGE`, `TYPE_SERVICE`) VALUES (?, ?, ?, ?)'
    var select_agent = 'SELECT `IM`, `PRENOMS`, `SERVICE` FROM `agent`'


    // verification de l'existance de la fiche
    connection.query(verification_fiche, [IM, date_test], (erreur, resultat)=>{
        console.log(date_test)
        console.log(resultat.length)
        console.log(resultat)
        if(resultat.length === 0)
        {
            connection.query(select_agent, (erreur, resultat) => {
                if(!erreur){
                    resultat.map(agent=>{
                        connection.query(creation_fiche, [agent.IM,agent.PRENOMS,date_test,agent.SERVICE], (erreur,resultat)=>{
                            console.log(agent.IM,agent.PRENOMS,date_test)
                        })
                    })
                    console.log(date_test)
                    console.log(resultat.length)
                    console.log(resultat)
                    if( new Date(0, 0, 0, splited[0], splited[1], 0) < test){
                        // matin
                        // var verification_matin = 'SELECT `TIME_AM` FROM `pointage` WHERE `MATRICULE_AGENT` =? AND `DATE_POINTAGE` =?';
                        connection.query(verification_matin, [IM, date_test], (erreur, resultat)=>{
                                // pointage du matin déjà effectué
                            if(resultat[0].TIME_AM != null){
                                res.status(404).json({message:"pointage du matin déjà effectué"})
                                console.log("heure matin existante")
                            }
                                // traitement du pointage de matin
                            else{
                                if( limit_matin > new Date(0, 0, 0, splited[0], splited[1], 0)) 
                                {
                                        // var matin_ponctuel = 'UPDATE `pointage` SET `TIME_AM`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
                                    connection.query(matin_ponctuel, [arrivee, IM, date_test], (erreur, resultat)=>{
                                        res.status(200).json({message:"Pointage du matin effectué avec succès"})
                                        console.log("matin mis a jour")
                                    })
                                    console.log("matin ponctuel")
                                }
                                else {
                                    var diff = new Date(0, 0, 0, splited[0], splited[1]).getTime() - limit_matin.getTime()
                                    var hours = Math.floor(diff/1000/60/60)
                                    diff -= hours*1000*60*60
                                    var minutes = Math.floor(diff/1000/60)
                                    if(hours<0) hours = hours+24
                                    var retar =  (hours<=9?"0":"")+hours+":"+(minutes<9?"0":"")+minutes
                                        // var update_heur_matin = 'UPDATE `pointage` SET `TIME_AM`=?,`RETARD_AM`=?,`RETARD`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
                                    connection.query(update_heur_matin, [arrivee, retar, retar, IM, date_test], (erreur, resultat)=>{
                                        res.status(200).json({message:"Pointage du matin effectué avec "+retar.split(":")[0]+" h : "+retar.split(":")[1]+" mins de retard"})
                                        connection.query(insertion_rapport, [IM, date_test, objet_rapport, contenu_rapport(retar), situation_rapport], (erreur,resultat)=>{
                                            console.log("rapport retardmatin insere")
                                        })
                                    console.log("calcul retard matin :"+retar)
                                    })
                                }
                            }
                        })
                    }
                    else{
                        // midi
                            // var verification_midi = 'SELECT `TIME_PM` FROM `pointage` WHERE `MATRICULE_AGENT` =? AND `DATE_POINTAGE` =?';
                        connection.query(verification_midi, [IM, date_test], (erreur, resultat)=>{
                            if(resultat[0]?.TIME_PM != null){
                                console.log("heure apres midi existante")
                                res.status(404).json({message:"pointage aprè-midi déjà effectué"})
                            }
                            else{
                                // calcul retard apres midi
                                if(limit_midi > new Date(0, 0, 0, splited[0], splited[1], 0)){
                                        // var midi_ponctuel = 'UPDATE `pointage` SET `TIME_PM`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
                                    connection.query(midi_ponctuel, [arrivee, IM, date_test], (erreur, resultat)=>{
                                        res.status(200).json({message:"pointage aprè-midi effectué avec succès"})
                                        console.log("apres midi ponctuel")
                                    })
                                }
                                else {
                    
                                    var diff = new Date(0, 0, 0, splited[0], splited[1]).getTime() - limit_midi.getTime()
                                    var hours = Math.floor(diff/1000/60/60)
                                    diff -= hours*1000*60*60
                                    var minutes = Math.floor(diff/1000/60)
                                    if(hours<0) hours = hours+24
                                    var retarMidibd = (hours<=9?"0":"")+hours+":"+(minutes<9?"0":"")+minutes
                                    var retarMidi=retarMidibd.split(":")
                    
                                    // var retard_gle = 'SELECT `RETARD` FROM `pointage` WHERE `MATRICULE_AGENT`= ? AND `DATE_POINTAGE`=?'
                                    connection.query(retard_gle,[IM, date_test],(erreur, resultat)=>{
                                        if(resultat[0]?.RETARD != null )
                                        {
                                            var retarGle=resultat[0]?.RETARD.split(":")
                                            var h=parseInt(retarGle[0])+parseInt(retarMidi[0])
                                            var m=parseInt(retarGle[1])+parseInt(retarMidi[1])
                                            var heureGle=h+Math.floor(m/60)
                                            var minuteGle=m%60
                                            var retardPle = (heureGle<=9?"0":"")+heureGle+":"+(minuteGle<=9?"0":"")+minuteGle
                                            // var update_heur_midi = 'UPDATE `pointage` SET `TIME_PM`=?,`RETERD_PM`=?,`RETARD`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
                                            connection.query(update_heur_midi, [arrivee, retarMidibd, retardPle, IM, date_test], (erreur, resultat)=>{console.log("midi avec matin inseré")})
                                        }
                                        else{
                                            // var midi_sans_matin = 'UPDATE `pointage` SET `TIME_PM`=?,`RETERD_PM`=?,`RETARD`=? WHERE `MATRICULE_AGENT` =? AND `DATE_POINTAGE`=?'
                                            connection.query(midi_sans_matin,[arrivee, retarMidibd, retarMidibd, IM, date_test], (erreur, resultat)=>{console.log("midi sans matin inseré")})
                                        }
                    
                                    connection.query(insertion_rapport, [IM, date_test, objet_rapport, contenu_rapport(retarMidibd), situation_rapport], (erreur,resultat)=>{
                                        console.log("rapport retard midi insere")
                                    })
                                    res.status(200).json({message:"Pointage du après-midi effectué avec "+retarMidi[0]+" h : "+retarMidi[1]+" mins de retard"})
                                    console.log("calcul retar midi:"+retarMidi+"\n calcul de retar general:"+retardPle)
                                    })
                                }
                            }
                        })
                    }
                }
                else {console.log(erreur)}
            })
        }
        else
        {
            if( new Date(0, 0, 0, splited[0], splited[1], 0) < test){
                // matin
                // var verification_matin = 'SELECT `TIME_AM` FROM `pointage` WHERE `MATRICULE_AGENT` =? AND `DATE_POINTAGE` =?';
                connection.query(verification_matin, [IM, date_test], (erreur, resultat)=>{
                        // pointage du matin déjà effectué
                    if(resultat[0].TIME_AM != null){
                        res.status(404).json({message:"pointage du matin déjà effectué"})
                        console.log("heure matin existante")
                    }
                        // traitement du pointage de matin
                    else{
                        if( limit_matin > new Date(0, 0, 0, splited[0], splited[1], 0)) 
                        {
                                // var matin_ponctuel = 'UPDATE `pointage` SET `TIME_AM`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
                            connection.query(matin_ponctuel, [arrivee, IM, date_test], (erreur, resultat)=>{
                                res.status(200).json({message:"Pointage du matin effectué avec succès"})
                                console.log("matin mis a jour")
                            })
                            console.log("matin ponctuel")
                        }
                        else {
                            var diff = new Date(0, 0, 0, splited[0], splited[1]).getTime() - limit_matin.getTime()
                            var hours = Math.floor(diff/1000/60/60)
                            diff -= hours*1000*60*60
                            var minutes = Math.floor(diff/1000/60)
                            if(hours<0) hours = hours+24
                            var retar =  (hours<=9?"0":"")+hours+":"+(minutes<9?"0":"")+minutes
                                // var update_heur_matin = 'UPDATE `pointage` SET `TIME_AM`=?,`RETARD_AM`=?,`RETARD`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
                            connection.query(update_heur_matin, [arrivee, retar, retar, IM, date_test], (erreur, resultat)=>{
                                res.status(200).json({message:"Pointage du matin effectué avec "+retar.split(":")[0]+" h : "+retar.split(":")[1]+" mins de retard"})
                                connection.query(insertion_rapport, [IM, date_test, objet_rapport, contenu_rapport(retar), situation_rapport], (erreur,resultat)=>{
                                    console.log("rapport retardmatin insere")
                                })
                            console.log("calcul retard matin :"+retar)
                            })
                        }
                    }
                })
            }
            else{
                // midi
                    // var verification_midi = 'SELECT `TIME_PM` FROM `pointage` WHERE `MATRICULE_AGENT` =? AND `DATE_POINTAGE` =?';
                connection.query(verification_midi, [IM, date_test], (erreur, resultat)=>{
                    if(resultat[0]?.TIME_PM != null){
                        console.log("heure apres midi existante")
                        res.status(404).json({message:"pointage aprè-midi déjà effectué"})
                    }
                    else{
                        // calcul retard apres midi
                        if(limit_midi > new Date(0, 0, 0, splited[0], splited[1], 0)){
                                // var midi_ponctuel = 'UPDATE `pointage` SET `TIME_PM`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
                            connection.query(midi_ponctuel, [arrivee, IM, date_test], (erreur, resultat)=>{
                                res.status(200).json({message:"pointage aprè-midi effectué avec succès"})
                                console.log("apres midi ponctuel")
                            })
                        }
                        else {
            
                            var diff = new Date(0, 0, 0, splited[0], splited[1]).getTime() - limit_midi.getTime()
                            var hours = Math.floor(diff/1000/60/60)
                            diff -= hours*1000*60*60
                            var minutes = Math.floor(diff/1000/60)
                            if(hours<0) hours = hours+24
                            var retarMidibd = (hours<=9?"0":"")+hours+":"+(minutes<9?"0":"")+minutes
                            var retarMidi=retarMidibd.split(":")
            
                            // var retard_gle = 'SELECT `RETARD` FROM `pointage` WHERE `MATRICULE_AGENT`= ? AND `DATE_POINTAGE`=?'
                            connection.query(retard_gle,[IM, date_test],(erreur, resultat)=>{
                                if(resultat[0]?.RETARD != null )
                                {
                                    var retarGle=resultat[0]?.RETARD.split(":")
                                    var h=parseInt(retarGle[0])+parseInt(retarMidi[0])
                                    var m=parseInt(retarGle[1])+parseInt(retarMidi[1])
                                    var heureGle=h+Math.floor(m/60)
                                    var minuteGle=m%60
                                    var retardPle = (heureGle<=9?"0":"")+heureGle+":"+(minuteGle<=9?"0":"")+minuteGle
                                    // var update_heur_midi = 'UPDATE `pointage` SET `TIME_PM`=?,`RETERD_PM`=?,`RETARD`=? WHERE `MATRICULE_AGENT`=? AND `DATE_POINTAGE` = ?'
                                    connection.query(update_heur_midi, [arrivee, retarMidibd, retardPle, IM, date_test], (erreur, resultat)=>{console.log("midi avec matin inseré")})
                                }
                                else{
                                    // var midi_sans_matin = 'UPDATE `pointage` SET `TIME_PM`=?,`RETERD_PM`=?,`RETARD`=? WHERE `MATRICULE_AGENT` =? AND `DATE_POINTAGE`=?'
                                    connection.query(midi_sans_matin,[arrivee, retarMidibd, retarMidibd, IM, date_test], (erreur, resultat)=>{console.log("midi sans matin inseré")})
                                }
            
                            connection.query(insertion_rapport, [IM, date_test, objet_rapport, contenu_rapport(retarMidibd), situation_rapport], (erreur,resultat)=>{
                                console.log("rapport retard midi insere")
                            })
                            res.status(200).json({message:"Pointage du après-midi effectué avec "+retarMidi[0]+" h : "+retarMidi[1]+" mins de retard"})
                            console.log("calcul retar midi:"+retarMidi+"\n calcul de retar general:"+retardPle)
                            })
                        }
                    }
                })
            }
        }
    })
})

    // // si la fiche n'existepas encore, on en cree une avec la liste des agens concernées


    // // verification de l'heure d'arrivee









    // connection.query(sql, (err, resultat) =>{
    //     if(!err){
    //         res.status(200).json(resultat);
    //     }
    //     else{
    //         console.log(err);
    //     }
    // });
// });


// let start = start.split(":");
// let end = end.split(":")
// var startdate = new Date(0, 0, 0, start[0], start[1], 0)
// var enddate = new Date(0, 0, 0, end[0], end[1], 0)
// var diff = enddate.getTime() - startdate.getTime();
// var hours = Math.floor(diff/1000/60/60)
// diff -= hours*1000*60*60
// var minutes = Math.floor(diff/1000/60)

// if(hours <0) hours = hours+24
// return (hours<=9?"0":"")+hours+":"+(minutes<9?"0":"")+minutes
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* INSERTION DANS LA TABLE POINTAGE */

router.post('/create1', (req, res, next) =>{
    let IM = req.body.IM;
    let date = new Date();
    let date_correcte = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 
    console.log(date_correcte);

    var SQL = 'SELECT * FROM pointage WHERE DATE_POINTAGE =? ';

    connection.query(SQL, date_correcte, (err, resultat) =>{

            if(resultat.length == 0){

                connection.query('SELECT  IM,  PRENOMS FROM agent WHERE LIEU_TRAVAIL="Ampasambazaha"' , (err, resultat) =>{

                    if(!err){
                        resultat.forEach(agent => {
            
                            // fiche de presence
                            let data = [agent.IM , agent.PRENOMS, date_correcte];
            
                                connection.query('INSERT INTO pointage (MATRICULE_AGENT, PRENOMS, DATE_POINTAGE) VALUES (? ,? ,? )' , data, (err, resultat) =>{
                                    if(!err){
                                        res.status(400).json({message : "Insertion reussi!"});
                                    }else{
                                        res.status(400).json({message : "Echec"});
                                    }
                            })
                        })
                    }
                    else {
                    res.status(400).json({message : "liste agent inaccessible"});
                    }});
            }else{
            //UPDATE TABLE POINTAGE

        }
    })
})





//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* MODIFICATION DANS LA TABLE POINTAGE */

router.patch('/update/:IM',  (req,res,next) =>{
    let IM = req.params.IM;
    let TIME = req.body.TIME_AM;
    let Lim = new Date();
    let Limite= Lim.setHours(12)+':'+Lim.setMinutes(00);

    console.log(TIME);


//     if (Heure_Arr < Limite) 
//         {   
//             let Lim_AM = Lim.setHours(8)+':'+Lim.setMinutes(30);
//             let SQL_1 = 'INSERT into pointage(time_Am) VALUES (?)';
//             //let sql = 'UPDATE pointage SET time_Am=? WHERE IM=?';

//             if (Heure_Arr < Lim_AM)
//             {
//                 connection.query(SQL_1,[Heure_Arr], (err, resultat) => {
//                     if(!err){
//                         res.status(200).json({message : "Matin reussi!"});
//                     }
//                     else{
//                         res.status(500).json(err);
//                     }
//                 })
//             }else
//                 {
//                     let retard_Am = Heure_Arr - Lim_AM;
//                     let data_3 = [Heure_Arr, retard_Am, IM];
//                     let requete = 'UPDATE pointage SET time_Am=? ,retard_Am=? WHERE IM=? ';

//                     connection.query(requete, data_3, (err, resultat) =>{
//                         if(!err){
//                             res.status(200).json({message : "Vous etes en retard ce matin!"});
//                         }
//                         else{
//                             res.status(500).json(err);
//                         }
//                     })
//                 };
//         }
//     else{
//             let Lim_PM = Lim.setHours(14)+':'+Lim.setMinutes(30);
//             let SQL_2 = 'INSERT into pointage(time_Pm) VALUES (?)';
//             //let sql_2 = 'UPDATE pointage SET time_Pm=? WHERE IM=

//             if(Heure_Arr < Lim_PM)
//             { 
//                 connection.query(SQL_2,[Heure_Arr], (err, resultat) => {
//                     if(!err){
//                         res.status(200).json({message : "Apres-midi reussi!"});
//                     }
//                     else{
//                         res.status(500).json(err);
//                     }
//                 });
//             }else
//                 {
//                     let retard_Pm = Heure_Arr - Lim_PM;
//                     let data_3 = [Heure_Arr, retard_Pm, IM];
//                     let requete_2 = 'UPDATE pointage SET time_Pm?, retard_Pm=? WHERE IM=?';
                
//                     connection.query(requete_2, data_3, (err, resultat) =>{
//                         if(!err){
//                             res.status(200).json({message : "Vous etes en retard cette apres-midi!"});
//                         }
//                         else{
//                             res.status(500).json(err);
//                         }
//                     })
//                 };
//         };

//     let R_AM = req.body.retard_Am;
//     let R_PM = req.body.retart_Pm;
//     let retard= R_AM + R_PM;
//     let data_4 = [R_AM, R_PM, IM];

//     connection.query('SELECT retard_Am, retard_Pm FROM pointage WHERE IM=? ', data_4, (err, resultat) =>{
//         if(!err){
//             connection.query('UPDATE pointage SET retard=? WHERE IM=? ', [retard, IM], (err, resultat) =>{
//                 if(!err){
//                     res.status(200).json({message : "Vous etiez en retard!"});
//                 }
//                 else{
//                     res.status(500).json(err);
//                 }});
    
//         }else{
//             res.status(500).json(err);
//         };

//     });

});


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* DELETE D'UN CONTENU DE LA TABLE POINTAGE */

router.delete('/delete/:id', (req, res) =>{
    let id = req.params.id;
    if(id)
    {
            connection.query("DELETE FROM pointage WHERE id=?", [id], (err, resultat) =>{
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