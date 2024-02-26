import { Strategy,  ExtractJwt} from 'passport-jwt'
import { jwtConfig } from '../config/jwt-config.js'

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
                const user = users.find(user => user.id === userId)
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