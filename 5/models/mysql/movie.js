import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString);

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()

            const [genres] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
            )

            if(genres.length === 0) 
                return []

            const [ {id} ] = genres

            return []
        }
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        )
        return movies;
    }

    static async getById({id}) {
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
                FROM movie WHERE id = UUID_TO_BIN(?);`, [id]
        )

        return movies.length === 0 ? null : movies;
    }

    static async create({input}) {
        const {
            genre: genreInput,
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        try {
            await connection.query(
                `INSERT INTO movie (id,title,year,director,duration,poster,rate)
                VALUES (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?);`,
                [title, year, director, duration, poster, rate]
            )
        } catch (e) {
            throw new Error('Error creating movie')
        }

        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
                FROM movie WHERE id = UUID_TO_BIN(?);`, [uuid]
        )

        return movies[0]
    }

    static async update({id, input}) {
        const {
            genre: genreInput,
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input

        try {
            await connection.query(
                `UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ?
                WHERE id = UUID_TO_BIN(?);`,
                [title, year, director, duration, poster, rate, id]
            )
        } catch (error) {
            throw new Error('Error updating movie')
        }
        
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
                FROM movie WHERE id = UUID_TO_BIN(?);`, [id]
        )

        return movies[0]
    }

    static async delete ({id}) {
        await connection.query(
            `DELETE FROM movie WHERE id = UUID_TO_BIN(?)`,
            [id]
        )
    }
}