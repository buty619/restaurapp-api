const mongoose = require("mongoose");
const User = require("../model/User");
var bcrypt = require('bcrypt-nodejs');
const fetch = require('node-fetch');

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
  const scope = "profile+email";
  const redirect = "https://restaurappapi.herokuapp.com/oauth/callback";

  res.redirect(`${url}?client_id=${clientID}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirect}`)
}

exports.oauthcall = async (req,res) => {
  const code = req.query.code;
  const peticion = {
    code:code,
    client_id : "646149026943-ph5lbqsa4cru7r32ko8nohqq07q9ishh.apps.googleusercontent.com",
    client_secret: "7Vxg4-1-aRE1Pj9mmejKK0U_",
    redirect_uri:"https://restaurappapi.herokuapp.com/oauth/callback",
    grant_type: "authorization_code"
  }
  let data  = await fetch("https://oauth2.googleapis.com/token",{
    method: "POST",
    body: JSON.stringify(peticion)
  })

  token = await data.json(); 
  const accessToken  = token.access_token;
  const userData = "names,emailAddresses";

  let credentials = await fetch(`https://people.googleapis.com/v1/people/me?personFields=${userData}&access_token=${accessToken}`);

  credentials = await credentials.json();
  userEmail = credentials.emailAddresses[0].value;
  userNickname = credentials.names[0].givenName;

  const hash = bcrypt.hashSync(1234);
  try{
    findUser = await User.findOne({email:userEmail});
  }catch(error){
    console.log(error);
  }
  
  

  if(findUser){
    res.status(204).send({msg: "usuario ya existe"});
  }else{
    User.create({email:userEmail,password:hash,nickname:userEmail}, err => {
      if(err){
        return console.log("ocurrio un error: ",err)
      }
      console.log("usuario generado");
    });
    res.status(204).send({msg: "usuario creado"});
  }
}
