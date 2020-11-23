const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    photos : [{
        path : String,
        description : String
    }],
    albumName : {
        type : String,
        required : true
    },
    albumType : {
        type : String,
        required : true
    },
    description : {
        type : String
    }
})

module.exports = mongoose.model("Album", albumSchema);