import { adaptRoute } from '@main/adapters/ExpressRouteAdapter'
import { makeSignUpController } from '@main/factories/SignUp'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
