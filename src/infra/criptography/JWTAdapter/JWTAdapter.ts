import { Decrypter } from '@data/protocols/criptography/Decrypter'
import { Encrypter } from '@data/protocols/criptography/Encrypter'
import jwt from 'jsonwebtoken'

export class JWTAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (payload: string): Promise<string> {
    const accessToken = await jwt.sign({ id: payload }, this.secret)
    return accessToken
  }

  async decrypt (payload: string): Promise<string> {
    await jwt.verify(payload, this.secret)
    return null
  }
}
