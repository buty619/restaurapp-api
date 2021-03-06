const app = require('express')();
const Restaurant = require("../model/Restaurant");
const aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-2'
});

s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME,
      acl: 'public-read',
      contentType: function (req, file, cb) {
          cb(null, file.mimetype);
      },
      key: function (req, file, cb) {
          console.log(file);
          cb(null, Date.now().toString());
      }
  })
});

const singleUpload = upload.single('image');

exports.uploadImg = function(req, res) {  
  singleUpload(req,res, (err) =>{
      if (err) return console.error(err);
      return res.json({'imageUrl':req.file.location});
  });
}

exports.findAll = async (req,res) =>{
  try{
    const listofRest = await Restaurant.find();
    res.json(listofRest);
  }catch(e){
    console.error(e);
  }
}

exports.create = async (req,res) =>{
  console.log(req.body);
  await Restaurant.create(req.body);
  res.status(204).send({});
}

exports.findOne = async (req,res) =>{
  const id = req.params.id;
  try{
    const listofRest = await  Restaurant.findById(id);
    res.json(listofRest);
  }catch(e){
    console.error(e);
  }
}

// exports.update = async (req,res) =>{
//   const id = req.params.id;
//   const Restaurant = await  Restaurant.findById(id);
//   Restaurant.title = req.body.title;
//   task.done = req.body.done;
//   task.updated_at = Date.now();
//   try{
//     await task.save({});
//     res.status(204).send({});
//   }catch(e){
//     return next(e);
//   }
// }

// exports.delete = async (req,res,next) =>{
//   const id = req.params.id;
//   const restaurant = await  Restaurant.findById(id);
//   try{
//     restaurant.remove(function(err) {
//       if (err) return console.error(err);
//     });  
//     res.status(204).send({});
//   }catch(e){
//     return next(e);
//   }
// }