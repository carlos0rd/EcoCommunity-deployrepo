const { body, param } = require('express-validator');
const validators = {};

validators.createPostValidator = [
param("postId")
    .optional()
    .isMongoId().withMessage("Identifier must be a Mongo Id"),
body("titulo")
    .notEmpty().withMessage("El titulo es requerido"),
body("descripcion")
    .notEmpty().withMessage("La descripción es requerida"),
body("imagen")
    .notEmpty().withMessage("La imagen es requerida")
    .isURL().withMessage("La URL de la imagen no es válida") ,   
body("etiquetas")
    .notEmpty().withMessage("Las etiquetas son requeridas"),          
body("tipo")
    .notEmpty().withMessage("El tipo de post es requerido"),

];

validators.idInParams = [
    param("postId")
    .notEmpty().withMessage("El id es requerido")
    .isMongoId().withMessage("El id no es válido")
];

validators.idenInParams = [
    param("identifier")
    .notEmpty().withMessage("El id es requerido")
    .isMongoId().withMessage("El id no es válido")
];

validators.saveCommentValidator = [
    body("content")
        .notEmpty().withMessage("El contenido es requerido")
        .isLength({ max: 280 }).withMessage("La longitud maxima del comentario es de 280 caracteres"),
    body("_id")
        .optional()
        .notEmpty().withMessage("_id es requerido")
        .isMongoId().withMessage("El id no es válido")
];

module.exports = validators;