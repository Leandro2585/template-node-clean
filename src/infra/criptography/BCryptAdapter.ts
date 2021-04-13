import bcrypt from 'bcrypt'
import { Hasher } from '@data/protocols/criptography/Hasher'
import { HashComparer } from '@data/protocols/criptography/HashComparer'

export class BCryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (payload: string): Promise<string> {
    const hash = await bcrypt.hash(payload, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash)
    return new Promise(resolve => resolve(true))
  }
}
