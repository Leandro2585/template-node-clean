import { adaptResolver } from '@main/adapters'
import { makeLoginController, makeSignUpController } from '@main/factories/controllers/account'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeLoginController(), args)
  },

  Mutation: {
    signup: async (parent: any, args: any) => adaptResolver(makeSignUpController(), args)
  }
}
