import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import { accessJwtConfig, refreshJwtConfig } from '../config/jwt-cofig.js'
import User from "../Models/User.js";

const AccessOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: accessJwtConfig,
}

const RefreshOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: refreshJwtConfig,
}

export default (passport) => {
    passport.use(
        'jwt-access',
        new Strategy( AccessOption, async (payload, done) => {
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

    passport.use(
        'jwt-refresh',
        new Strategy(RefreshOption, async (payload, done) => {
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