// import modules
const router = require('express').Router()
const { User, Pet } = require('../../models')
const withAuth = require('../../utils/auth')


// GET all pets
router.get('/', (req, res) => {
    Pet.findAll({
        // Get all pets info include user info
        order: [
            ['created_at', 'DESC']
        ],
        include: [
            {
                model: User,
            },
        ]
    })
        // return pets data
        .then((petData) => res.status(200).json(petData))
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


//GET one pet by input info ---------------------- not completed yet
router.get('/:id', withAuth, (req, res) => {
    Pet.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: User,
            },
        ]
    })
        .then(petData => {
            // if not found, return message
            if (!petData) {
                return res.status(404).json({ message: 'Cannot found pet by this id!' })
            }
            // else, return data
            res.status(200).json(petData)
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// Create a new pet
router.post('/', withAuth, (req, res) => {
    Pet.create({
        type: req.body.type,
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        description: req.body.description,
        location: req.body.location,
        ownername: req.body.ownername,
        phone: req.body.phone,
        user_id: req.session.user_id
    })
        // if no err, return data
        .then(petData => res.status(200).json(petData))
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// Update a pet
router.put('/:id', withAuth, (req, res) => {
    Pet.update(
        {
            type: req.body.type,
            name: req.body.name,
            age: req.body.age,
            description: req.body.description,
            location: req.body.location,
            ownername: req.body.ownername,
            phone: req.body.phone,
            user_id: req.session.user_id
        },
        {
            where: { id: req.params.id }
        })
        .then(petData => {
            if (!petData[0]) {
                return res.status(404).json({ message: 'Cannot found pet by this id!' })
            }
            res.status(200).json(petData)
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// DELETE a pet
router.delete('/:id', withAuth, (req, res) => {
    Pet.destroy({
        where: { id: req.params.id }
    })
        .then(petData => {
            if (!petData) {
                return res.status(404).json({ message: 'Cannot found pet by this id!' })
            }
            res.status(200).json(petData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


module.exports = router