const express = require('express');
const connection = require('../connection');
const router = express.Router(); 

router.get('/liste', (req,res,next)=>{
    var sql = 'SELECT IM,  PRENOMS,  LIEU_TRAVAIL, TYPE_AGENT, STATUT_PRESENCE, SERVICE, PHOTO FROM agent';

    connection.query(sql, (err, resultat) =>{
        if(!err){
            res.status(200).json(resultat);
        }
        else{
            res.status(400).json({message : "Erreur"});
        }
    });
})

module.exports = router;