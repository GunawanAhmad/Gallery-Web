const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email : {
    type : String,
    required : true
  },
  albums : [{
    
      type : mongoose.Types.ObjectId,
      ref : 'Album'
    
  }]
  
});

module.exports = mongoose.model("User", userSchema);
