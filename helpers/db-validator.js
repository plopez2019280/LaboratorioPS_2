const Alumno = require('../models/alumno');
const Role = require();


const existenteEmail = async (correo = '') => {
    const existenteEmail = await Alumno.findOne({correo});
    if(existenteEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const existeAlumnoById = async ( id = '') => {
    const existeAlumno = await Alumno.findOne({id});
    if(!existeAlumno){
        throw new Error (`El alumno con el ${ id } no existe`);
    }
}

const existeMaestroById = async ( id = '') => {
    const existeMaestro = await Maestro.findOne({id});
    if(!existeMaestro){
        throw new Error(`El maestro con el ${ id } no existe`);
    }
}

const esRolExistente = async (role= '') => {
    const existeRol = await Role.findOne({role});
    if(existeRol){
        throw new Error (`El rol ${ role } no existe en base de datos`);
    }
}

module.exports ={
    existenteEmail,
    existeAlumnoById,
    existeMaestroById,
    esRolExistente   
}