const express = require("express");
const app = require('express')();
const cookieSession = require('cookie-session');
app.use(cookieSession({secret:"Shh! It's a secret"}));
const controller = require("./controller/control");
//const registrations = require("./controller/registrations");
//const session = require("./controller/session");
const middlewares= require('./middlewares');

app.post('/upload', controller.uploadimg);

app.get("/restaurants",controller.findAll);
app.get("/restaurants/:id", controller.findOne);
app.post("/restaurants", controller.create);
// app.patch('/restaurants/:id', controller.update);
app.delete('/restaurants/:id', controller.delete);