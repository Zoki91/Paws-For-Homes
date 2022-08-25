const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model{

}

Pet.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    typeOfPet: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    breed:{
        type: DataTypes.STRING,
        allowNull
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 20,
            min: 0
        }
    },
    Gender:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description:{
       type: DataTypes.INTEGER,
       allowNull: false
    },
    location:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    firstName:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phoneNumber:{
        type: DataTypes.INTERGER,
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
           model:'user',
           key:'id'
        }
    }

},
{
   sequelize,
   timestamps: false,
   freezeTableName: true,
   underscored: true,
   modelName: 'pet'
}
);

module.exports = Pet;