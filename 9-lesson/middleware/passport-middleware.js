import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import { jwtConfig } from '../config/jwt-cofig.js'
import User from "../Models/User.js";

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig,
}

const users = [ {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    password: '$2b$10$5rcIrJq1hfiirA6GCrK2..yrUx5v88eXj985LSIzlwdkqfpQIFQ9m'
}]

export default (passport) => {
    passport.use(
        new Strategy(option, async (payload, done) => {
            const { userId } = payload
            try {
                const user = await User.findByPk(userId, {
                    attributes: { exclude: ['password'] },
                })
                // const user = {}
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        }),
    )
}