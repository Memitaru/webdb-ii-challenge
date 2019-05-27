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
        .then(results => {
            db('zoos')
                .where({id: results[0]})
                .first()
                .then(zoo => {
                    res.status(200).json(zoo)
                })
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;