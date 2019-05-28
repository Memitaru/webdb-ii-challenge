const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true
}

const db = knex(knexConfig);

router.get('/', (req, res) => {
    db('zoos')
        .first()
        .then(zoos => {
            res.status(200).json(zoos)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    db('zoos')
        .where({id: req.params.id})
        .first()
        .then(zoo => {
            if (zoo) {
                res.status(200).json(zoo)
            } else {
                res.status(404).json({message: "No zoo found"})
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

router.post('/', (req, res) => {
    db('zoos').insert(req.body, 'id')
        .first()
        .then(results => {
            res.status(201).json(results)
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.delete('/:id', (req, res) => {
    db('zoos')
        .where({id: req.params.id})
        .del()
        .then(count => {
            if (count) {
                res.status(200).json(count)
            } else {
                res.status(404).json({message: "No zoo at that ID"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put('/:id', (req, res) => {
    db('zoos')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => {
            if (count) {
                res.status(200).json(count)
            } else {
                res.status(404).json({message: "No zoo at that ID"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;