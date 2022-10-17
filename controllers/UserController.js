const db = require('../models/index');
const { User } = db;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    let body = req.body
    User.findOne({ email: body.email }).then(usuarioDB => {
        if (!usuarioDB) {
            return res.status(400).json({
              ok: false,
              err: {
                  message: "Usuario o contraseña incorrectos"
              }
           })
         }
      // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
         if (! bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
               ok: false,
               err: {
                 message: "Usuario o contraseña incorrectos"
               }
            });
         }
      // Genera el token de autenticación
          let token = jwt.sign({
                 usuario: usuarioDB,
              }, process.env.SEED_AUTENTICACION, {
              expiresIn: process.env.CADUCIDAD_TOKEN
          });
          res.json({
              ok: true,
              usuario: usuarioDB,
              token,
          })
    }).catch(error => next(error));
}

const register = (req, res, next) => {
    let { email, password, dni, phone } = req.body;
    let usuario = {
        email,
        dni,
        phone,
        password: bcrypt.hashSync(password, 10)
      };
    User.create(usuario).then(usuarioDB => {
        return res.status(201).json({
            ok: true,
            usuario: usuarioDB
         }).end();
    })
}

module.exports = {
    login,
    register
}