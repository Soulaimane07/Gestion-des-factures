const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profiles/clients'); // specify your upload folder
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({ storage: storage });


const Client = require('../models/client')

router.get('/', (req, res, next) => {
    Client.find()
        .select('_id profile name raisonsocial if ice natureclient exoneration fournisseurs')
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

router.post('/', upload.single('profile'), (req, res, next) => {
    const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        profile: req?.file?.path, // the path of the uploaded image
        name: req.body.name,
        raisonsocial: req.body.raisonsocial,
        if: Number(req.body.if),
        ice: Number(req.body.ice),
        natureclient: Number(req.body.natureclient),
        exoneration: req.body.exoneration,
        fournisseurs: req.body.fournisseurs,
    });

    client.save()
        .then(docs => {
            res.status(201).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/selectfournisseurs', (req, res, next) => {
    const client = req.body.client
    const fournisseurs = req.body.fournisseurs

    const UpdateClient = {
        name: client.name,
        raisonsocial: client.raisonsocial,
        if: client.if,
        ice: client.ice,
        natureclient: client.natureclient,
        exoneration: client.exoneration,
        fournisseurs: fournisseurs,
    }

    Client.updateOne({_id: client._id}, {$set: UpdateClient})
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

router.get('/:clientId', (req, res, next) => {
    const clientId = req.params.clientId

    Client.findOne({_id: clientId})
        .select("_id profile name raisonsocial if ice natureclient exoneration fournisseurs")
        .populate('fournisseurs')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.patch('/:clientId',  upload.single('profile'), (req, res, next) => {
    const clientId = req.params.clientId

    const UpdateClient = {
        profile: req?.file?.path ?? null,
        name: req.body.name,
        raisonsocial: req.body.raisonsocial,
        if: req.body.if,
        ice: req.body.ice,
        natureclient: req.body.natureclient,
        exoneration: req.body.exoneration,
        fournisseurs: req.body.fournisseurs,
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