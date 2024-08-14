const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const Client = require('../models/client')

router.get('/', (req, res, next) => {
    Client.find()
        .select('_id name raisonsocial if ice natureclient exoneration fournisseur')
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
    const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        raisonsocial: req.body.raisonsocial,
        if: Number(req.body.if),
        ice: Number(req.body.ice),
        natureclient: req.body.natureclient,
        exoneration: Number(req.body.exoneration),
        fournisseur: req.body.fournisseur,
    })

    client.save()
        .then(docs => {
            res.status(201).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
})

router.get('/:clientId', (req, res, next) => {
    const clientId = req.params.clientId

    Client.findOne({_id: clientId})
        .select("_id name raisonsocial if ice natureclient exoneration fournisseur")
        .populate('fournisseur')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.patch('/:clientId', (req, res, next) => {
    const clientId = req.params.clientId

    const UpdateClient = {
        name: req.body.name,
        raisonsocial: req.body.raisonsocial,
        if: req.body.if,
        ice: req.body.ice,
        natureclient: req.body.natureclient,
        exoneration: req.body.exoneration,
        fournisseur: req.body.fournisseur,
    }

    Client.updateOne({_id: clientId}, {$set: UpdateClient})
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

router.delete('/:clientId', (req, res, next) => {
    const clientId = req.params.clientId
   
    Client.deleteOne({_id: clientId})
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
    Client.deleteMany()
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