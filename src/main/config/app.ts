import express from 'express'
import setupRoutes from './routes'
import setupSwagger from './swagger'
import setupMiddlewares from './middlewares'
import setupStaticFiles from './staticFiles'
const app = express()

setupSwagger(app)
setupStaticFiles(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
