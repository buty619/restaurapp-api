const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const aws = require('aws-sdk');
const controller = require("./controller/control");
var multer = require('multer');
var multerS3 = require('multer-s3');
const PORT = process.env.PORT  || 3000;
const S3_BUCKET = process.env.S3_BUCKET;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/top_dev', { useNewUrlParser: true });
//mongoose.connect('mongodb+srv://CristianB:cristian1991@cluster0-vjfaj.mongodb.net/taskApi?retryWrites=true', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });
app.use(express.json());
app.use(express.urlencoded());
app.use(cors()); 
app.use(bodyParser.json());

aws.config.update({
    secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
    accessKeyId: 'AWS_ACCESS_KEY_ID',
    region: 'us-east-2'
});
 
const s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'restaurappimg',
        key: function (req, file, cb) {
            console.log("entroooo");
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

app.post('/upload', upload.array('upl',0),  (req, res, next) => {
    res.send("Uploaded!");
});

app.get("/restaurants",controller.findAll);
app.get("/restaurants/:id", controller.findOne);
app.post("/restaurants", controller.create);
// app.patch('/restaurants/:id', controller.update);
app.delete('/restaurants/:id', controller.delete);

//app.listen(3000, () => console.log("Inició en puerto 3000 ..."));
app.listen(PORT, () => console.log("Inició en puerto .." + PORT));