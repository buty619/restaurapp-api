const mongoose = require("mongoose");
const User = require("../model/User");
var bcrypt = require('bcrypt-nodejs');

// exports.new = (req,res) =>{
//     res.render("registations");
// }

exports.create = (req,res) => { 
    const hash = bcrypt.hashSync(req.body.password);  
    User.create({email:req.body.email,password:hash,nickname:req.body.nickname}, err => {
      if(err){
        return console.log("ocurrio un error: ",err)
      }
      console.log("usuario generado");
    });
  res.redirect("/logIn");
}


// exports.oauth = (req,res) => { 
//   //res.post("");
// }

// exports.oauthcall = (req,res) => { 
//   console.log(req.access_token);
//   res.send({});
// }
