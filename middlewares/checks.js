const { validateEmail } = require('../helpers/helpers');
const jwt = require('jsonwebtoken');

const checkLoggedIn = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, {complete: true})
    if(!decoded) {
        const e = new Error("No se permite")
        next(e)
    }
    else {
        next()    
    }
}

const checkAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, {complete: true})
    if(!decoded || decoded.payload.usuario.role !== 'ADMIN') {
        const e = new Error("No se permite")
        next(e)
    }
    else {
        next()    
    }
}

const checkLoggedUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, {complete: true});
    if(!decoded) {
        const e = new Error("No se permite")
        next(e)
    }
    else {
        req.user = decoded.payload.usuario
        next()    
    }
}

const checkMail = (req, res, next) => {
    if(validateEmail(req.body.email)) {
        next();
    } else {
        const error = new Error("Bad request");
        error.status = 400;
        next(error);
    }
}

module.exports = {
    checkAdmin,
    checkLoggedIn,
    checkLoggedUser,
    checkMail
}