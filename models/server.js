const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');
const bodyParser = require('body-parser');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.alumnosPath = '/api/alumno';
        this.conectarDB();    
        this.routes();
        this.middlewares();
        this.app.use(bodyParser.json());
    }

    async conectarDB(){
        await dbConnection();

    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.alumnosPath, require('../routes/alumno.routes'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutado y esuchando en el puerto', this.port);
        });
    }
}


module.exports = Server;