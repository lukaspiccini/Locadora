var movieRepositorie = require('../Repositories/MovieRepositorie');
require('dotenv').config();

exports.GetAll = function(req,res) {
    movieRepositorie.getAll().then(function(resultado){
        if(resultado.length > 0) {
            res.status(200).send({movies: resultado});
            return;
        }
        else {
            res.status(200).send({message:"Nenhum filme cadastrado."});
            return;
        }
    });
}

exports.GetByTitle = function(req,res) {
    var title = req.params.title;

    movieRepositorie.getByTitle(title).then(function(resultado){
        if(resultado.length > 0) {
            res.status(200).send(resultado);
            return;
        }
        else {
            res.status(200).send({message: "Nenhum filme cadastrado com este titulo"});
        }
    });
}