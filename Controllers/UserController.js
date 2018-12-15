var db = require('../Database/db');
var HashHelper = require('../Helpers/Criptografia');

exports.CreateUser = function(req,res){
    var userRequest = req.body;
    userRequest.Password = HashHelper.HashPassword(userRequest.Password);

    if(userRequest.Password == null) {
        res.status(500).send({message:"Erro ao criptografar senha do usuario"});
        return;
    }
    else {
        db.query("INSERT INTO users SET ?", userRequest, function(erro, resultado) {
            if (erro) {
                res.status(500).send( {message: "Erro ao inserir usuario no banco de dados"} )
                return;
            } 
            else {
                var idInserido = resultado.insertId;
    
                res.status(201).send({
                    userId: idInserido,
                    links: [
                        {
                            rel: "self",
                            href: "http://localhost:3000/users/user/" + idInserido
                        }
                    ]
                });
            }
        });
    }
}