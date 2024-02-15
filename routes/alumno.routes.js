const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeAlumnoById, esRolExistente } = require('../helpers/db-validator');

const { getAlumnoById, alumnosGet, alumnosPut, alumnosDelete, alumnosPost } = require('../controllers/alumno.controller');
const router = Router();

router.get("/", alumnosGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], getAlumnoById);

router.put(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], alumnosPut);

router.delete(
        "/:id",
        [
            check("id","El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existeAlumnoById),
            validarCampos
        ], alumnosDelete);

        
router.post(
    "/", 
    [
        /*check("nombres","El nombre es obligatorio").not().isEmpty(),
        check("apellidos","El alumno debe de tener apellidos").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min: 6,}),
        check("carne","El alumno debe tener un carne").not().isEmpty(),
        check("correo","El alumno debe tener un correo").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRolExistente),*/
        validarCampos
    ], alumnosPost); 

module.exports = router;