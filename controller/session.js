const app = require('express')();
const User = require("../model/User");

exports.create =  async function(req, res, next) {  
  const auth = req.body.auth;
  const password = req.body.password;
  try {
    const user = await User.authenticate(auth, password);
    if (user) {
      req.session.userId = user._id;
      res.status(204).send({});
    } else {
        res.status(400).send({});
    }
  } catch (e) {
    return next(e);
  }
}

exports.logOut = async function(req, res){
  req.session = null;
}