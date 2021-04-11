import bcrypt from 'bcrypt'
import { Encrypter } from '@data/protocols/criptography/Encrypter'

export class BCryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (payload: string): Promise<string> {
    const hash = await bcrypt.hash(payload, this.salt)
    return hash
  }
}
