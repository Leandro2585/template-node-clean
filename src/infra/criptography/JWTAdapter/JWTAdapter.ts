import { Encrypter } from '@data/protocols/criptography/Encrypter'
import jwt from 'jsonwebtoken'

export class JWTAdapter implements Encrypter {
  private readonly secret: string;
  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (payload: string): Promise<string> {
    const accessToken = await jwt.sign({ id: payload }, this.secret)
    return accessToken
  }
}
