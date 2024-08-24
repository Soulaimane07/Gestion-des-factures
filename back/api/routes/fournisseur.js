const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Fournisseur = require('../models/fournisseur');
const ClientFournisseur = require('../models/ClientFour');

// Helper function to handle errors
const handleError = (res, err) => {
    console.error(err);
    res.status(500).json({ error: err.message });
};

// GET all fournisseurs
router.get('/', async (req, res) => {
    try {
        const fournisseurs = await Fournisseur.find()
            .select('_id name raisonsocial if ice code ras exoneration activite forme reglementation fiscale')
            .exec();
        res.status(200).json(fournisseurs);
    } catch (err) {
        handleError(res, err);
    }
});

// POST a new fournisseur
router.post('/', async (req, res) => {
    const { name, raisonsocial, if: ifNumber, ice, code, exoneration, activite, forme, reglementation, fiscale, ras } = req.body;

    if (!name || !raisonsocial) {
        return res.status(400).json({ error: "Name and raison social are required" });
    }

    try {
        const fournisseur = new Fournisseur({
            _id: new mongoose.Types.ObjectId(),
            name,
            raisonsocial,
            if: Number(ifNumber),
            ice: Number(ice),
            code,
            exoneration,
            activite: Number(activite),
            forme: Number(forme),
            reglementation,
            fiscale,
            ras: Number(ras),
        });

        const result = await fournisseur.save();
        res.status(201).json(result);
    } catch (err) {
        handleError(res, err);
    }
});

// GET a fournisseur by ID
 // Import Client model

 router.get('/:fournisseurId', async (req, res) => {
    try {
        const fournisseurId = req.params.fournisseurId;

        // Fetch fournisseur details
        const fournisseur = await Fournisseur.findById(fournisseurId).exec();
        if (!fournisseur) {
            return res.status(404).json({ message: "Fournisseur not found" });
        }

        // Find ClientFournisseur documents related to this fournisseur
        const clientFournisseurs = await ClientFournisseur.find({
            'fournisseurs.fournisseur': fournisseurId
        }).populate({
            path: 'client',
            select: '_id name raisonsocial if ice natureclient exoneration' // Fetch all fields you want to include in client data
        }).exec();


        // Map clients with their associated ras values
        const clientsWithRas = clientFournisseurs.flatMap(clientFournisseur =>
            clientFournisseur.fournisseurs
                .filter(f => f.fournisseur.toString() === fournisseurId)
                .map(f => ({
                    ...clientFournisseur.client.toObject(), // Include all fields of client
                    ras: f.ras
                }))
        );

        // Return structured response
        res.status(200).json({
            ...fournisseur?.toObject(), // Include all fields of fournisseur
            clients: clientsWithRas
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// PATCH a fournisseur by ID
router.patch('/:fournisseurId', async (req, res) => {
    try {
        const updatedFournisseur = await Fournisseur.findByIdAndUpdate(
            req.params.fournisseurId,
            { $set: req.body },
            { new: true }
        ).exec();

        if (!updatedFournisseur) {
            return res.status(404).json({ message: "Fournisseur not found" });
        }

        res.status(200).json(updatedFournisseur);
    } catch (err) {
        handleError(res, err);
    }
});

// DELETE a fournisseur by ID
router.delete('/:fournisseurId', async (req, res) => {
    try {
        const result = await Fournisseur.findByIdAndDelete(req.params.fournisseurId).exec();
        
        if (!result) {
            return res.status(404).json({ message: "Fournisseur not found" });
        }

        res.status(200).json({ message: "Fournisseur deleted successfully" });
    } catch (err) {
        handleError(res, err);
    }
});

// DELETE all fournisseurs
router.delete('/', async (req, res) => {
    try {
        const result = await Fournisseur.deleteMany().exec();
        res.status(200).json({ message: "All fournisseurs deleted successfully", result });
    } catch (err) {
        handleError(res, err);
    }
});

module.exports = router;
