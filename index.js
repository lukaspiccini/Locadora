var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var userRoute = require('./Routes/UsersRoute');

app.use(bodyParser.json());

app.use('/users', userRoute)

app.listen(3000, () => {
    console.log("Servidor rodando")
})
