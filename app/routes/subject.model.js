const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    amount: {
        type: String
    }
}, {
    collection: 'subjects'
});

module.exports = mongoose.model('Subject', Subject);