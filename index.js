var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var userRoute = require('./Routes/UsersRoute');
var authenticationRoute = require('./Routes/AuthenticationRoute');

app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/authentication', authenticationRoute);

app.listen(3000, () => {
    console.log("Servidor rodando")
})
