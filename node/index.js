const express = require("express");
const userRoutes = require("./router/userRoutes");
const openRoutes = require("./router/openRoutes");
const adminRoutes = require("./router/adminRoutes");
const cors = require("cors");
const connectToDatabase = require("./db");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolvers/articleResolvers");
const typeDefs = require("./schema/articleSchema");
const {
  userTokenMiddlewareForJWT,
  adminTokenMiddlewareForJWT,
} = require("./Middlewares/Middleware");
const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();

  app.use((req, res, next) => {
    
    next();
  });

  server.applyMiddleware({ app });
  app.use("/user", userTokenMiddlewareForJWT, userRoutes);
  app.use("/admin", adminTokenMiddlewareForJWT, adminRoutes);
  app.use("/open", openRoutes);

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
     // Log the GraphQL endpoint
    
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
