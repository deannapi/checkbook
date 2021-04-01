const path = require("path");
const express = require("express");

const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const { verify } = require("crypto");

const key = process.env.APOLLO_KEY;

const PORT = process.env.PORT || 3000;
const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Apollo server
// const server = new ApolloServer({
//   schema,
//   context: ({ req, res }) => {
//     const context = {};

//     // verify jwt token
//     const parts = req.headers.authorization
//       ? req.headers.authorization.split(" ")
//       : [""];

//     const token = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : undefined;
//     context.authUser = token ? verify(token) : undefined;

//     return context;
//   },
// });


const server = new ApolloServer({
  schema,
  // apollo: key,
  context: authMiddleware
  // playground: true,
  // introspection: true
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Server up static assets
// app.use("/images", express.static(path.join(__dirname, "../client/images")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
