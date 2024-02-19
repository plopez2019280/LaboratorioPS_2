const express = require('express');
const cors =  require('cors');
const {dbConnection} = require('../db/config')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.studentPath = '/api/student';
        this.teacherPath = '/api/teacher';
        this.authPath = '/api/auth';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.studentPath, require('../routes/student.routes'));
        this.app.use(this.teacherPath, require('../routes/teacher.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutandose y escuchandose en el puerto:', this.port)
        });
    }

    
}


module.exports = Server;

