const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketersSchema = new Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone_number : {
        type : String,
        required : true
    },
});

let marketers = mongoose.model("marketers",marketersSchema);

module.exports = marketers;