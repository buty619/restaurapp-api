const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const cors = require("cors");
const cookieSession = require('cookie-session');
const routes= require('./routes');
const PORT = process.env.PORT  || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/top_dev', { useNewUrlParser: true });
//mongoose.connect('mongodb+srv://CristianB:cristian1991@cluster0-vjfaj.mongodb.net/taskApi?retryWrites=true', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
  //origin: 'http://localhost:3000', //ruta desde donde se hacen las peticiones
  credentials: true
})); 
app.use(bodyParser.json());
app.use(cookieSession({secret:"Shh! It's a secret"}));

app.use("/",routes);

//app.listen(3000, () => console.log("Inició en puerto 3000 ..."));
app.listen(PORT, () => console.log("Inició en puerto .." + PORT));