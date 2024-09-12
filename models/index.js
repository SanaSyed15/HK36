// models/index.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the User model
const User = sequelize.define('User', {
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    PasswordHash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Define the Profile model
const Profile = sequelize.define('Profile', {
    ProfileID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'UserID'
        }
    },
    FirstName: DataTypes.STRING(50),
    LastName: DataTypes.STRING(50),
    DateOfBirth: DataTypes.DATE,
    Gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other')
    },
    City: DataTypes.STRING(100),
    Country: DataTypes.STRING(100),
    Email: DataTypes.STRING(100),
    PhoneNumber: DataTypes.STRING(20),
    LinkedInProfile: DataTypes.STRING(255),
    EducationalQualification: DataTypes.STRING(255),
    Institution: DataTypes.STRING(255)
});

// Define associations
User.hasOne(Profile, { foreignKey: 'UserID' });
Profile.belongsTo(User, { foreignKey: 'UserID' });

module.exports = { User, Profile };