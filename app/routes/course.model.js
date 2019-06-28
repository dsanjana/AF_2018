const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: {
        type: String
    },
    code: {
        type: String
    },
    passMark: {
        type: String
    },
    lectureinCharge: {
        type: String
    },
    subjects: [String]
}, {
    collection: 'courses'
});

module.exports = mongoose.model('Course', Course);
