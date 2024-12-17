var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer'); // Aggiunto multer per il caricamento dei file

var app = express();

// Configurazione di multer per salvare il file in memoria
var upload = multer({storage: multer.memoryStorage()});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Endpoint per il caricamento dei file
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
    if (!req.file) {
        return res.status(400).json({error: 'Nessun file caricato'});
    }

    // Estrazione delle informazioni del file
    const fileInfo = {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    };

    res.json(fileInfo);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port)
});
