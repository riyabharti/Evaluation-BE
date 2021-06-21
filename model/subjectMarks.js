var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var marksSchema = new Schema({
    "subCode": {
        type: String,
        required: true
    },
    "sec": {
        type: String,
        required: true
    },
    "examName": {
        type: String,
        required: true
    },
    "marks": [
    {
        "name": {
            type: String
        },
        "roll": {
            type: String
        },
        "score": {
            type: Number
        }
    }]
    
},{timestamps: true})

module.exports = mongoose.model('Marksheet',marksSchema);