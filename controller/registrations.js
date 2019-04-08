const mongoose = require("mongoose");
const User = require("../model/User");
var bcrypt = require('bcrypt-nodejs');

exports.create = (req,res) => { 
    const hash = bcrypt.hashSync(req.body.password);  
    User.create({email:req.body.email,password:hash,nickname:req.body.nickname}, err => {
      if(err){
        return console.log("ocurrio un error: ",err)
      }
      console.log("usuario generado");
    });
    res.status(204).send({});
}


exports.oauth = (req,res) => { 
  const url = "https://accounts.google.com/o/oauth2/v2/auth";
  const clientID = "646149026943-ph5lbqsa4cru7r32ko8nohqq07q9ishh.apps.googleusercontent.com";
  const responseType ="code";
  const scope = "profile-email";
  const redirect = "https://restaurappapi.herokuapp.com/auth/callback";

  res.redirect(`${url}?client_id=${clientID}&responce_type=${responseType}&scope=${scope}&redirect_uri=${redirect}`)
}

exports.oauthcall = (req,res) => { 
  const code = req.query.code;
  console.log(code);
}
