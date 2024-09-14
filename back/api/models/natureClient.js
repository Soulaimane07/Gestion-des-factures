const mongoose = require('mongoose')

const natureClientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        require: false,
        unique: true
    },
});

module.exports = mongoose.model('NatureClient', natureClientSchema)