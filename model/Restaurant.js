const mongoose = require("mongoose");

var restauratSchema = mongoose.Schema({
  name: String,
  category: String,
  direction: String,
  description: String,
  url1: String,
  url2: String,
  url3: String,
  fav:  Boolean
});

module.exports = mongoose.model("Restaurant", restauratSchema);
