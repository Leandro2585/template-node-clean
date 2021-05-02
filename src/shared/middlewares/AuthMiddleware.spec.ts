import { AccessDeniedError } from '@shared/errors'
import { forbidden } from '@shared/helpers/http/HttpHelper'
import { AuthMiddleware } from './AuthMiddleware'

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
