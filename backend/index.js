const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = require('./connection');

const routeLogin = require('./route/login');
const routePersonnel = require('./route/personnel');
const routemission = require('./route/mission.js'); 
const routeAutorisation = require('./route/autorisation');
const routeRapport = require('./route/rapport');
const routePointage =  require('./route/pointage');
const routeDemande = require('./route/demande_autorisation');

const personnel = require("./route/agent");
const zanaka = require("./route/enfant");
const avancement = require("./route/avancement");
const suivi = require("./route/suivi"); 



app.use(express.static("Public"));

app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(cors());


//Updload image
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: './Public/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
}); 

const upload = multer({
    storage : storage,
    limits : {fileSize: 1000000}
}); 

app.use('/upload', express.static('./Public/images'));

app.post("/upload" , upload.single('image') , (req, res) => {
    res.status(200).json({
        success : 1,
        profile_url: `http://localhost:3001/images/${req.file.filename}`
    });
});

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) { 
        res.status(500).json({
            success: 0,
            message: err.message
        }); 
    }
}

app.use(errHandler);  


app.use('/authentification', routeLogin);

app.use('/personnel', routePersonnel);

app.use('/mission', routemission);

app.use('/autorisation', routeAutorisation);

app.use('/rapport', routeRapport);

app.use('/pointage', routePointage);

app.use('/demande_autorisation', routeDemande);

app.use("/agent", personnel);

app.use("/authentification", routeLogin);

app.use("/enfant", zanaka);

app.use("/avancement", avancement);

app.use("/suivi", suivi);

module.exports = app;