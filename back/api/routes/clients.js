const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Client = require('../models/client');
const ClientFournisseur = require('../models/ClientFour');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profiles/clients');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({ storage });

// GET all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find()
            .select('_id profile name raisonsocial if ice natureclient exoneration fournisseurs')
            .exec();
        res.status(200).json(clients);
    } catch (err) {
        handleError(res, err);
    }
});

// POST a new client with file upload
router.post('/', upload.single('profile'), async (req, res) => {
    const { name, raisonsocial, if: ifNumber, ice, natureclient, exoneration, fournisseurs } = req.body;

    if (!name || !raisonsocial) {
        return res.status(400).json({ error: "Name and raison social are required" });
    }

    try {
        const client = new Client({
            _id: new mongoose.Types.ObjectId(),
            profile: req?.file?.path, // profile image path
            name,
            raisonsocial,
            if: Number(ifNumber),
            ice: Number(ice),
            natureclient: Number(natureclient),
            exoneration,
            fournisseurs
        });

        const result = await client.save();
        res.status(201).json(result);
    } catch (err) {
        handleError(res, err);
    }
});

// GET a client by ID with populated fournisseurs
router.get('/:clientId', async (req, res) => {
    try {
        // Find the client
        const client = await Client.findById(req.params.clientId)
            .select('_id profile name raisonsocial if ice natureclient exoneration')
            .exec();

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        // Find and populate associated ClientFournisseur documents
        const clientFournisseurs = await ClientFournisseur.find({ client: req.params.clientId })
            .populate('fournisseurs.fournisseur') // Populate the fournisseur details
            .exec();

        // Build the fournisseurs array with detailed data
        const fournisseursWithRas = clientFournisseurs.flatMap(cf =>
            cf.fournisseurs.map(f => ({
                _id: f.fournisseur._id,
                name: f.fournisseur.name,
                raisonsocial: f.fournisseur.raisonsocial,
                if: f.fournisseur.if,
                ice: f.fournisseur.ice,
                code: f.fournisseur.code,
                exoneration: f.fournisseur.exoneration,
                activite: f.fournisseur.activite,
                forme: f.fournisseur.forme,
                reglementation: f.fournisseur.reglementation,
                fiscale: f.fournisseur.fiscale,
                ras: f.ras
            }))
        );

        // Combine client data with the formatted fournisseurs
        const response = {
                ...client.toObject(), // Convert mongoose document to plain object
                fournisseurs: fournisseursWithRas
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});



// PATCH a client by ID with file upload
router.patch('/:clientId', upload.single('profile'), async (req, res) => {
    try {
        const updatedData = {
            ...req.body,
            profile: req?.file?.path || req.body.profile // Update profile image only if uploaded
        };

        const updatedClient = await Client.findByIdAndUpdate(req.params.clientId, { $set: updatedData }, { new: true }).exec();

        if (!updatedClient) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json(updatedClient);
    } catch (err) {
        handleError(res, err);
    }
});

// DELETE a client by ID
router.delete('/:clientId', async (req, res) => {
    try {
        const result = await Client.findByIdAndDelete(req.params.clientId).exec();

        if (!result) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json({ message: "Client deleted successfully" });
    } catch (err) {
        handleError(res, err);
    }
});

// DELETE all clients
router.delete('/', async (req, res) => {
    try {
        const result = await Client.deleteMany().exec();
        res.status(200).json({ message: "All clients deleted successfully", result });
    } catch (err) {
        handleError(res, err);
    }
});

module.exports = router;
