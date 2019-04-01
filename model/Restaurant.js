const mongoose = require("mongoose");

var restauratSchema = mongoose.Schema({
  name: String,
  category: String,
  direction: String,
  description: String,
  fav:Boolean
});

module.exports = mongoose.model("Restaurant", restauratSchema);
