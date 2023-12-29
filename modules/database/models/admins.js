const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminsSchema = new Schema({
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
});

let admins = mongoose.model("admins",adminsSchema);

module.exports = admins;