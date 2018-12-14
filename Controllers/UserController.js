var db = require('../Database/db');
var jwt = require('jsonwebtoken');

exports.create_user = function(req,res){
    var user = req.body

    db.query("INSERT INTO users SET ?", user, (erro, resultado) => {
        if (erro){
            res.status(500).send( {message: "Erro ao inserir usuario no banco de dados"} )
            return;
        } 
        else {
            var idInserido = resultado.insertId;

            res.status(201).send({
                UserId: idInserido,
                Links: [
                    {
                        rel: "self",
                        href: "http://localhost:3000/users/user/" + idInserido
                    }
                ]
            });
        }
    });
}