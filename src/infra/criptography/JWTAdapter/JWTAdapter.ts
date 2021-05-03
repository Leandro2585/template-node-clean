import { Decrypter } from '@data/protocols/criptography/Decrypter'
import { Encrypter } from '@data/protocols/criptography/Encrypter'
import jwt from 'jsonwebtoken'

export class JWTAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (payload: string): Promise<string> {
    const accessToken = await jwt.sign({ id: payload }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string> {
    const value: any = await jwt.verify(token, this.secret)
    return value
  }
}
