const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Fournisseur = require('../models/fournisseur')
const Client = require('../models/client')

router.get('/', (req, res, next) => {
    Fournisseur.find()
        .select('_id name raisonsocial if ice code exoneration activite forme reglementation fiscale')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const fournisseur = new Fournisseur({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        raisonsocial: req.body.raisonsocial,
        if: Number(req.body.if),
        ice: Number(req.body.ice),
        code: req.body.code,
        exoneration: req.body.exoneration,
        activite: Number(req.body.activite),
        forme: Number(req.body.forme),
        reglementation: req.body.reglementation,
        fiscale: req.body.fiscale,
    })

    fournisseur.save()
        .then(docs => {
            res.status(201).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.get('/:fournisseurId', (req, res, next) => {
    const fournisseurId = req.params.fournisseurId

    Fournisseur.findOne({_id: fournisseurId})
        .select("_id name raisonsocial if ice code exoneration activite forme reglementation fiscale")
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.get('/:fournisseurId/clients', (req, res, next) => {
    const fournisseurId = req.params.fournisseurId;

    Client.find({ fournisseurs: fournisseurId }) 
        .select("_id name raisonsocial if ice code exoneration activite forme reglementation fiscale")
        .exec()
        .then(clients => {
            res.status(200).json(clients); // Return the list of clients in the response
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err }); // Handle any errors
        });
});

router.patch('/:fournisseurId', (req, res, next) => {
    const fournisseurId = req.params.fournisseurId

    const UpdateFournisseur = {
        name: req.body.name,
        raisonsocial: req.body.raisonsocial,
        if: Number(req.body.if),
        ice: Number(req.body.ice),
        code: req.body.code,
        exoneration: req.body.exoneration,
        activite: Number(req.body.activite),
        forme: Number(req.body.forme),
        reglementation: req.body.reglementation,
        fiscale: req.body.fiscale,
    }

    Fournisseur.updateOne({_id: fournisseurId}, {$set: UpdateFournisseur})
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:fournisseurId', (req, res, next) => {
    const fournisseurId = req.params.fournisseurId
   
    Fournisseur.deleteOne({_id: fournisseurId})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/', (req, res, next) => {
    Fournisseur.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router