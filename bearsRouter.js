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
    db('bears')
        .first()
        .then(bears => {
            res.status(200).json(bears)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    db('bears')
        .where({id: req.params.id})
        .first()
        .then(bear => {
            if (bear){
                res.status(200).json(bear)
            } else {
                res.status(404).json({message: "No bear at this ID"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/', (req, res) => {
    db('bears')
        .insert(req.body, 'id')
        .then(results => {
            res.status(200).json(results[0])
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put('/:id', (req, res) => {
    db('bears')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => {
            if (count) {
                res.status(200).json(count)
            } else {
                res.status(404).json({message: "No bear at that ID"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete('/:id', (req, res) => {
    db('bears')
        .where({id: req.params.id})
        .del()
        .then(count => {
            if (count) {
                res.status(200).json(count)
            } else {
                res.status(404).json({message: "No bear at that ID"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;