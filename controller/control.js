const app = require('express')();
const Restaurant = require("../model/Restaurant");

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

exports.delete = async (req,res,next) =>{
  const id = req.params.id;
  const restaurant = await  Restaurant.findById(id);
  try{
    restaurant.remove(function(err) {
      if (err) return console.error(err);
    });  
    res.status(204).send({});
  }catch(e){
    return next(e);
  }
}