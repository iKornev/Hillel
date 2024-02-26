import { Sequelize } from 'sequelize'
import sequelize from '../config/squelize-config.js'

const User = sequelize.define('User', {

    password: {
        type: Sequelize.STRING,
        defaultValue: 1,
    },
    login: {
        type: Sequelize.STRING,
        defaultValue: 1,
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: 1,
    },
})

export  { User }