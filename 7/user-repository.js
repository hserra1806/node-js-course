import crypto from 'node:crypto'

import DBLocal from 'db-local'
import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    Validation.validate(username, 3, 'username')
    Validation.validate(password, 6, 'password')

    const user = User.findOne({ username })
    if (user) throw new Error('username already exists')

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  static async login ({ username, password }) {
    Validation.validate(username, 3, 'username')
    Validation.validate(password, 6, 'password')

    const user = User.findOne({ username })
    if (!user) throw new Error('username does not exist')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('password is invalid')

    const { password: _, ...publicUser } = user

    return publicUser
  }
}

class Validation {
  static validate (field, charLimit, fieldName) {
    if (typeof field !== 'string') throw new Error('username must be a string')
    if (field.length < charLimit) throw new Error(`${fieldName} must be at least ${charLimit} characters`)
  }
}
