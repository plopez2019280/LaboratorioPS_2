const { Schema, model} = require('mongoose');

const CursoSchema = Schema ({
    materia: {
        type: String,
        required: [true, 'El curso debe de llevar una materia']
    },
    docente: {
        type: String,
        required: [true, 'El curso debe de llevar un docente']
    },
    aula: {
        type: String,
        required: [true, 'El curso debe de llevar un aula']
    },
    jornada: {
        type: String,
        required: [true, 'El curso debe de llevar una jornada']
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Curso', CursoSchema);