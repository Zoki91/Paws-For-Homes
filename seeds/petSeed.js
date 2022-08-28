// import moduels
const { Pet } = require('../models')

// prepare data
const petData = [
    {
        typeOfPet: 'Cat',
        name: 'Cat1',
        breed: '1',
        age: 1,
        gender: 'male',
        description: 'good',
        location: 'Melbourne',
        user_id: 1        
    },
    {
        typeOfPet: 'Dog',
        name: 'Dog1',
        breed: '3',
        age: 1,
        gender: 'male',
        description: 'good',
        location: 'Melbourne',
        user_id: 1  
    },
    {
        typeOfPet: 'Cat2',
        name: 'Cat2',
        breed: '1',
        age: 1,
        gender: 'male',
        description: 'good',
        location: 'Melbourne',
        user_id: 2  
    },
];

// bulk create data
const petSeed = () => {
  return Pet.bulkCreate(petData)
}

// export moduels
module.exports = petSeed

