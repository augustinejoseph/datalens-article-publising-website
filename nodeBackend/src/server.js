const express = require('express');
const apiRouter = require('./router/api');
const categoryRouter = require('./router/categoryRouter')
const cors = require('cors');
const connectToDatabase = require('./db');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers/articleResolvers');
const typeDefs = require('./schema/articleSchema');
const singleArticleRouter = require('./router/singleArticleRouter')

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
connectToDatabase();

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();

  // Apply the ApolloServer middleware to the Express app
  server.applyMiddleware({ app });

  // REST API routes
  app.use('/api', apiRouter);
  app.use('/category', categoryRouter)
  app.use('/article', singleArticleRouter); 


  // Start the server
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Now listening for requests on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
