const { Schema, model} = require('mongoose');

const AlumnoSchema = Schema ({
    nombres: {
        type: String,
        required: [true, 'El alumno debe de tener nombres']
    },
    apellidos: {
        type: String,
        required: [true, 'El alumno debe de tener apellidos']
    },
    password: {
        type: String,
        required: [true, 'El alumno debe de tener contraseña']
    },
    carne: {
        type: String,
        required: [true, 'El alumno debe de tener carné']
    },
    correo: {
        type: String,
        required: [true, 'El alumno debe de tener correo']
    },
    role: {
        type: String,
        required: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Alumno', AlumnoSchema);