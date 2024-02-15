const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');


const alumnosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, alumnos] = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        alumnos
    });
}

const getAlumnoById = async (req, res) => {
    const { id } = req.params;
    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        alumno
    });
}

const alumnosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    await Alumno.findByIdAndUpdate(id, resto);

    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        msg: 'Alumno Actualizado exitosamente',
        alumno
    })
}

const alumnosDelete = async (req, res) => {
    const { id } = req.params;
    await Alumno.findByIdAndUpdate(id, { estado: false });

    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        msg: 'Alumno eliminado exitosamente',
        alumno
    });
}

/*const alumnosPost = async (req, res) => {
    // Check if req.body exists
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }

    const { nombres, apellidos, password, carne, correo, role } = req.body;

    // Check if required properties exist in req.body
    if (!nombres || !apellidos || !password || !carne || !correo || !role) {
        return res.status(400).json({ error: "Required properties are missing from request body" });
    }

    const alumno = new Alumno({ nombres, apellidos, password, carne, correo, role });

    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();
    res.status(200).json({
        alumno
    });
}*/


const alumnosPost = async (req, res) => {
    const { nombres, apellidos, password, carne, correo, role } = req.body;
    const alumno = new Alumno({nombres,apellidos,password,carne,correo,role});

    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();
    res.status(200).json({
        alumno
    });
}



module.exports = {
    alumnosPost,
    alumnosGet,
    getAlumnoById,
    alumnosPut,
    alumnosDelete
}