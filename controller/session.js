const app = require('express')();
const User = require("../model/User");
const cookieSession = require('cookie-session');

exports.create =  async function(req, res, next) {  
  const auth = req.body.auth;
  const password = req.body.password;
  try {
    const user = await User.authenticate(auth, password);
    if (user) {
      req.session.userId = user._id;
      //console.log(session.userId);
      //res.cookie("restaurappCookie",user._id,{  domain: '.restaurapp.com', httpOnly: false}).status(204).send({});
      //res.status(204).send(req.session.userId);
      res.status(204).send(user._id);
      //res.session.userId;
    } else {
      res.status(401).send({});
    }
  } catch (e) {
    return next(e);
  }
}

exports.logOut = async function(req, res){
  req.session = null;
}