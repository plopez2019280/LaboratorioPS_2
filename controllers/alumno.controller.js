const bcryptjs = require('bcryptjs');
const Student = require('../models/alumno');

const alumnoGet = async(req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, student] = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        alumno
    });
}

const getAlumnoById = async(req, res) => {
    const { id } = req.params;
    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        alumno
    });
}

const alumnoPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, role, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const alumno = await Student.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Estudiante Actualizado Exitosamente',
        alumno
    });
}

const alumnoDelete = async(req, res) => {
    const { id } = req.params;
    const alumno = await Alumno.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Estudiante eliminado exitosamente',
        alumno
    });
}

const alumnoPost = async(req, res) => {
    const { nombre, correo, password, curso, role } = req.body;
    const student = new Student({ nombre, correo, password, curso, role });

    const salt = bcryptjs.genSaltSync();
    console.log(password);
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();
    console.log({ nombre, correo, password, curso, role })
    res.status(202).json({
        alumno
    });
}

module.exports = {
    alumnoPost,
    alumnoGet,
    alumnoDelete,
    getAlumnoById,
    alumnoPut
}
