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
      //res.cookie("restaurappCookie",user._id,{  domain: '.restaurapp.com', httpOnly: false});
      res.status(204).send({});
    } else {
      res.status(401).send({});
    }
  } catch (err) {
    res.status(400).send({ error: 'Authentication failed.' });
  }
}

exports.logOut = async function(req, res){
  req.session = null;
}