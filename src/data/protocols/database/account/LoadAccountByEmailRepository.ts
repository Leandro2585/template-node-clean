import { LoadAccountByEmailRepositorySpy } from '@tests/data/fakes';
import { AccountModel } from '@domain/models/Account'

export interface LoadAccountByEmailRepository {
  loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result>;
}

export namespace LoadAccountByEmailRepository {
  export type Result = AccountModel
}