const express = require("express");
const app = require('express')();
const router = express.Router();
const cookieSession = require('cookie-session');
app.use(cookieSession({ secret: "Shh! It's a secret" }));
const restManage = require("./controller/restManage");
const registrations = require("./controller/registrations");
const session = require("./controller/session");
//const middlewares= require('./middlewares');

// ------   registration  -------  //
router.post("/register", registrations.create);
router.post("/redirect", registrations.redirection);
router.get("/oauth", registrations.oauth);
router.get("/oauth/callback", registrations.oauthcall);


// ------   Session  -------  //
router.post("/logIn", session.create);
router.post("/mail", session.mail);
// router.get("/logOut", session.logOut);

// ------   restaurant manage -------  //
router.post('/upload', restManage.uploadImg);
router.get("/restaurants", restManage.findAll);
router.get("/restaurants/:id", restManage.findOne);
router.post("/restaurants", restManage.create);
// app.patch('/restaurants/:id', controller.update);
//router.delete('/restaurants/:id', restManage.delete);

module.exports = router; 