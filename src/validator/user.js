import { body, check } from "express-validator";

 const validateUser = [
    body("username").notEmpty().trim().escape().withMessage("Verifique seu nome"),
    body("email").isEmail().notEmpty().withMessage("o e-mail deve conter um endereço de e-mail válido"),
    check('password')
    .isLength({ min: 8 })
    .withMessage('deve ter pelo menos 8 caracteres')
    .matches(/\d/)
    .withMessage('senha deve conter um número')
];


export default  validateUser ;