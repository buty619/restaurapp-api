const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const controller = require("./controller/control");
const PORT = process.env.PORT  || 3000;
const S3_BUCKET = process.env.S3_BUCKET;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/top_dev', { useNewUrlParser: true });
//mongoose.connect('mongodb+srv://CristianB:cristian1991@cluster0-vjfaj.mongodb.net/taskApi?retryWrites=true', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

app.use(express.json());
app.use(express.urlencoded());
app.use(cors()); 
app.use(bodyParser.json());





app.post('/upload', controller.uploadimg);

app.get("/restaurants",controller.findAll);
app.get("/restaurants/:id", controller.findOne);
app.post("/restaurants", controller.create);
// app.patch('/restaurants/:id', controller.update);
app.delete('/restaurants/:id', controller.delete);

//app.listen(3000, () => console.log("Inició en puerto 3000 ..."));
app.listen(PORT, () => console.log("Inició en puerto .." + PORT));