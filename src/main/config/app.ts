import express from 'express'
import setupRoutes from './routes'
import setupSwagger from './swagger'
import setupMiddlewares from './middlewares'
import setupStaticFiles from './staticFiles'
import setupApolloServer from './apolloServer'

const app = express()

setupApolloServer(app)
setupStaticFiles(app)
setupMiddlewares(app)
setupSwagger(app)
setupRoutes(app)

export default app
