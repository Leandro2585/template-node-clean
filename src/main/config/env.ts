export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-server',
  port: process.env.SERVER_PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'default'
}
