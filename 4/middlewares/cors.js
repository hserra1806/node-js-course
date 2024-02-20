import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com'
]
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {} ) => cors({
    origin: (origin, cb) => {
        if (acceptedOrigins.includes(origin) || !origin) {
            return cb(null, true)
        }

        return cb(new Error('Not allowed by CORS'))
    }
})