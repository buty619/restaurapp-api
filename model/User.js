const mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  email: String,
  password:String,
  nickname:String
});

userSchema.statics.authenticate = async (auth, password) => {
  // buscamos el usuario utilizando el email
  const useremail = await mongoose.model("User").findOne({ email: auth });
  const usernick = await mongoose.model("User").findOne({ nickname: auth });
 
  if(useremail){
    user = useremail;
  }else if(usernick){
    user = usernick;
  }else{
    user = null;
  }

  if (user) {   
    // si existe comparamos la contraseña
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        resolve(result === true ? user : null);
      });
      return user;
    });    
  }
  return null;
};

module.exports = mongoose.model("User", userSchema);
