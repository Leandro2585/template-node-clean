import { adaptRoute } from '../adapters/express/ExpressRouteAdapter'
import { makeSignUpController } from '../factories/SignUp/SignUpFactory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
