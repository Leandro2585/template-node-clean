import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/Encrypter'

export class BCryptAdapter implements Encrypter{
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }
  async encrypt(payload: string): Promise<string> {
    await bcrypt.hash(payload, 12)
    return null
  }

}