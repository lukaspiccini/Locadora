var db = require('../Database/db');
var HashHelper = require('../Helpers/Criptografia');
var JwtHelper = require('../Helpers/Jwt');
require('dotenv').config();

exports.Login = function(req,res) {
    var userRequest = req.body;

    db.query("SELECT * FROM users WHERE Email = ?", userRequest.Email, function(erro, resultado){
        if(erro) {
            res.status(500).send({message: "Erro ao buscar o usuario no banco de dados"});
            return;
        }
        
        if(resultado.length == 0) {
            res.status(200).send({message: "Nenhum usuario encontrado com este email"});
            return;
        }
        else {
            var authenticatedUser = resultado[0];

            if(HashHelper.ComparePassword(userRequest.Password, authenticatedUser.Password)) {
                const generatedToken = JwtHelper.GenerateToken(authenticatedUser);
                
                res.status(200).send({
                    auth: true,
                    user: {
                        id: authenticatedUser.UserId,
                        email: authenticatedUser.Email,
                        nome: authenticatedUser.Name
                    },
                    token: generatedToken
                })
                return;
            }
            else {
                res.status(200).send({message: "Senha incorreta"});
                return;
            }
        }
    });
    
};

exports.Logout = function(req,res) {
    const token = req.headers["authorization"];

    db.query("INSERT INTO tokens_blacklist SET ?", {Token: token, InvalidatedAt: new Date().toLocaleString()}, function(erro, resultado){
        if(erro) {
            res.status(500).send({message: "Erro ao invalidar token"});
            return;
        }
        else {
            res.status(200).send({message: "Logout realizado com sucesso!"});
            return;
        }

    });
};