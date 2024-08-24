const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profile: {
        type: String,
        require: false
    },
    name: String,
    raisonsocial: String,
    if: Number,
    ice: Number,
    natureclient: Number,
    exoneration: Boolean,
    fournisseurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientFournisseur"
    }]
});

module.exports = mongoose.model('Client', clientSchema)