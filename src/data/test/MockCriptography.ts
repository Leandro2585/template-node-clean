import { Decrypter, Encrypter, HashComparer, Hasher } from '@data/protocols/criptography'
import faker from 'faker'

export class HasherSpy implements Hasher {
  payload: string;
  result = faker.datatype.uuid();

  async hash(payload: string): Promise<string> {
    this.payload = payload
    return this.result
  }
}

export class HashComparerSpy implements HashComparer {
  payload: string;
  hashed: string;
  isValid = true

  async compare(payload: string, hashed: string): Promise<boolean> {
    this.payload = payload
    this.hashed = hashed
    return this.isValid
  }
}

export class EncrypterSpy implements Encrypter {
  hashed = faker.datatype.uuid();
  payload: string;

  async encrypt (payload: string): Promise<string> {
    this.payload = payload
    return this.hashed
  }
}

export class DecrypterSpy implements Decrypter {
  payload = faker.internet.password();
  hashed: string;

  async decrypt (hashed: string): Promise<string> {
    this.hashed = hashed
    return this.payload
  }
}




