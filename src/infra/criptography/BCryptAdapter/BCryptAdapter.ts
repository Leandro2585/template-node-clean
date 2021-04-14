import bcrypt from 'bcrypt'
import { Hasher } from '@data/protocols/criptography/Hasher'
import { HashComparer } from '@data/protocols/criptography/HashComparer'

export class BCryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (payload: string): Promise<string> {
    const hash = await bcrypt.hash(payload, this.salt)
    return hash
  }

  async compare (payload: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(payload, hash)
    return isValid
  }
}
