import bcrypt from 'bcrypt'
import { Hasher } from '@data/protocols/criptography/Hasher'

export class BCryptAdapter implements Hasher {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (payload: string): Promise<string> {
    const hash = await bcrypt.hash(payload, this.salt)
    return hash
  }
}
