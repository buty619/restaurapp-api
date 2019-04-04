const express = require("express");
const app = require('express')();
const router = express.Router();
const cookieSession = require('cookie-session');
app.use(cookieSession({secret:"Shh! It's a secret"}));
const controller = require("./controller/control");
//const registrations = require("./controller/registrations");
//const session = require("./controller/session");
//const middlewares= require('./middlewares');

router.post('/upload', controller.uploadimg);

router.get("/restaurants",controller.findAll);
router.get("/restaurants/:id", controller.findOne);
router.post("/restaurants", controller.create);
// app.patch('/restaurants/:id', controller.update);
router.delete('/restaurants/:id', controller.delete);

module.exports = router;