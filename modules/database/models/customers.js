const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Object_id = Schema.ObjectId;

const customersSchema = new Schema({
    marketer_id: {
        type: Object_id,
        required: true
    },
    // city_id: {
    //     type: Object_id,
    //     required: true
    // },
    phone_number: {
        type: String,
        required: true
    },
    customer_brand: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },

}, { timestamps : true });

let customers = mongoose.model("customers", customersSchema);

module.exports = customers;