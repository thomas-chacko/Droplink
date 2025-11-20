import bcrypt from 'bcryptjs'

const SALT_ROUNDS: number = 10

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword)
}