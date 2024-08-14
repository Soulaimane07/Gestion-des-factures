const mongoose = require('mongoose')

const fournisseurSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    raisonsocial: String,
    if: Number,
    ice: Number,
    code: String,
    activite: String,
})

module.exports = mongoose.model('Fournisseur', fournisseurSchema)