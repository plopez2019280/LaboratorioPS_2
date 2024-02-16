const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre debe de ser obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'el correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'la clave es obligatoria']
    },
    role: {
        type: String,
        enum: ["STUDENT_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    },

});

StudentSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
};

module.exports = model('Alumno', AlumnoSchema);