const express = require('express');
const newArticleRouter = require('./router/article');
const categoryRouter = require('./router/categoryRouter')
const cors = require('cors');
const connectToDatabase = require('./db');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers/articleResolvers');
const typeDefs = require('./schema/articleSchema');
const singleArticleRouter = require('./router/singleArticleRouter')
const adminArticleManagementRouter = require('./router/adminArticleManagementRouter')

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
connectToDatabase();

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();

  // Log the incoming requests
  app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });
  // Apply the ApolloServer middleware to the Express app
  server.applyMiddleware({ app });

  // REST API routes
  app.use('/newarticle', newArticleRouter);
  app.use('/category', categoryRouter)
  app.use('/article', singleArticleRouter);
  app.use('/article-management', adminArticleManagementRouter)


  // Start the server
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`GraphQL endpoint: ${server.graphqlPath}`); // Log the GraphQL endpoint
    console.log(`Now listening for requests on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
