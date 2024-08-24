const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const ClientFournisseur = require('../models/ClientFour');

// Get all fournisseur relationships for a client
router.get('/client/:clientId', (req, res, next) => {
    const clientId = req.params.clientId;

    ClientFournisseur.findOne({ client: clientId })
        .populate('client fournisseurs.fournisseur')
        .exec()
        .then(docs => {
            if (docs) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({ message: 'No relationships found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

// Add a new fournisseur relationship to a client
router.post('/', (req, res, next) => {
    const { client, fournisseurs } = req.body;

    ClientFournisseur.findOneAndUpdate(
        { client: client },
        { fournisseurs: fournisseurs },
        { upsert: true, new: true }
    )
    .exec()
    .then(docs => {
        res.status(201).json(docs);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: err });
    });
});


// Update the RAS value of a specific fournisseur for a client
router.patch('/client/:clientId/fournisseur/:fournisseurId', (req, res, next) => {
    const { clientId, fournisseurId } = req.params;
    const { ras } = req.body;

    ClientFournisseur.findOneAndUpdate(
        { client: clientId, 'fournisseurs.fournisseur': fournisseurId },
        { $set: { 'fournisseurs.$.ras': ras } },
    )
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: err });
    });
});

// Remove a fournisseur from a client
router.delete('/client/:clientId/fournisseur/:fournisseurId', (req, res, next) => {
    const { clientId, fournisseurId } = req.params;

    ClientFournisseur.findOneAndUpdate(
        { client: clientId },
        { $pull: { fournisseurs: { fournisseur: fournisseurId } } },
        { new: true }
    )
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: err });
    });
});

router.delete('/', async (req, res) => {
    try {
        const result = await ClientFournisseur.deleteMany().exec();
        res.status(200).json({ message: "All fournisseurs deleted successfully", result });
    } catch (err) {
        handleError(res, err);
    }
});

module.exports = router;
