import { loginPath } from './paths/LoginPath'
import { accountSchema, loginParamsSchema } from './schemas'
export default {
  openapi: '3.0.0',
  info: {
    title: 'Template Clean Server',
    description: 'NodeJS Api server template using concepts design patterns, clean code and SOLID principles',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema
  }
}
