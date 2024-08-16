const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    raisonsocial: String,
    if: Number,
    ice: Number,
    natureclient: String,
    exoneration: Boolean,
    fournisseurs: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fournisseur",
    }],
})

module.exports = mongoose.model('Client', clientSchema)