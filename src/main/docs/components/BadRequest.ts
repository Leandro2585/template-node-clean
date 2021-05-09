export const badRequest = {
  description: 'Requisição invalida',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
