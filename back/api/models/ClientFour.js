const mongoose = require('mongoose');

const clientFournisseurSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    fournisseurs: [{
        fournisseur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Fournisseur",
            required: true
        },
        ras: {
            type: Number,
            required: true
        }
    }]
}, { id: false }); // Prevent adding _id to subdocuments

module.exports = mongoose.model('ClientFournisseur', clientFournisseurSchema);