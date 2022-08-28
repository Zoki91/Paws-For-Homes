// import modules
const router = require('express').Router()
const { User, Pet } = require('../../models')
const withAuth = require('../../utils/auth')


// GET all pets
router.get('/', (req, res) => {
    Pet.findAll({
        // Get all pets info include user info
        include: [
            {
                model: User,
                attributes: ['username', 'email', 'phoneNumber']
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


// //GET one pet by id ---------------------- 
// router.get('/:id',
//     // withAuth, // TODO: uncomment this after finish testing 
//     (req, res) => {
//         Pet.findOne({
//             where: { id: req.params.id },
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username', 'email', 'phoneNumber']
//                 },
//             ]
//         })
//             .then(petData => {
//                 // if not found, return message
//                 if (!petData) {
//                     return res.status(404).json({ message: 'Cannot found pet by this id!' })
//                 }
//                 // else, return data
//                 res.status(200).json(petData)
//             })
//             // handle err
//             .catch(err => {
//                 console.log(err)
//                 res.status(500).json(err)
//             })
//     })



// GET pets by user search input ------------- not completed yet
router.get('/search',
    // withAuth,  // TODO: uncomment this after finish testing
    (req, res) => {
        Pet.findAll({
            where: {
                typeOfPet: req.body.typeOfPet,
                breed: req.body.breed,
                gender: req.body.gender,
                location: req.body.location
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'email', 'phoneNumber']
                },
            ]
        })
            .then(petData => {
                // if not found, return message
                if (!petData) {
                    return res.status(404).json({ message: 'Cannot found any pets!' })
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
router.post('/',
    // withAuth, // TODO: uncomment this after finish testing 
    (req, res) => {
        Pet.create({
            typeOfPet: req.body.typeOfPet,
            name: req.body.name,
            breed: req.body.breed,
            age: req.body.age,
            gender: req.body.gender,
            description: req.body.description,
            location: req.body.location,
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
router.put('/:id',
    // withAuth, // TODO: uncomment this after finish testing 
    (req, res) => {
        Pet.update(
            {
                type: req.body.type,
                name: req.body.name,
                breed: req.body.breed,
                age: req.body.age,
                gender: req.body.gender,
                description: req.body.description,
                location: req.body.location,
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
router.delete('/:id',
    // withAuth, // TODO: uncomment this after finish testing
    (req, res) => {
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