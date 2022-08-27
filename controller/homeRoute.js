// import modules
const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Pet } = require('../models')

//GET all pets and rander home page
router.get('/', (req, res) => {
    Pet.findAll()
        .then(petsData => {
            // map all pets create a array
            const pets = petsData.map(pet => pet.get({ plain: true }))
            // pass all pets to homepage
            res.render('homepage', {
                pets,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// login & sign up link
router.get('/login', (req, res) => {
    // if login success, redirect to home page
    if (req.session.loggedIn) {
       return res.redirect('/')
    }
    res.render('login')
})

module.exports = router
