const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema(
    {
        Name : {
            type: String,
            required: true
        },
        Position : {
            type: String,
            required: true
        },
        Office : {
            type: String,
            required: true
        },
        Age : {
            type: Number,
            default: Date.now
        },
        "Start date":{
            type: Date,
            default: Date.now
        },
        Salary: {
            type: String,
            required: true
        }
    }
);

const tableData = mongoose.model('tablepoints', tableSchema);
module.exports = tableData;
