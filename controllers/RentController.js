const db = require('../models/index');
const { Rent, Movie } = db
const { Op } = require('sequelize');



const rentMovie = (req, res, next) => {

    const { code } = req.params;

    Movie.findOne({ where: { code: code, stock: { [Op.gt]: 0 } } })
        .then(rental => {
            if (!rental) throw new Error(' Pelicula no disponible ')
            Rent.create({
                code: rental.code,
                id_user: req.user.id,
                rent_date: Date.now(),
                refund_date: new Date(Date.now() + (3600 * 1000 * 24) * 7),

            }).then(data => {
                Movie.update({ stock: rental.stock - 1, rentals: rental.rentals + 1 }, { where: { code: rental.code } })
                    .then(() => res.status(201).send(data))
            })
        })
}


module.exports = {
    rentMovie
}