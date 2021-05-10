export const surveyResultSchema = {
  type: 'object',
  properties: {
    answer: {
      id: {
        type: 'string'
      },
      surveyId: {
        type: 'string'
      },
      accountId: {
        type: 'string'
      },
      answer: {
        type: 'string'
      },
      date: {
        type: 'string'
      }
    }
  }
}
