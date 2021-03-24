import app from './config/app'

const port = process.env.API_PORT || 3333

app.listen(port, () => {
  console.log('🚀Server started at http://localhost:' + port)
})
