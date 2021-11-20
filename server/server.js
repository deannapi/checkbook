// import npm packages
const path = require("path");
const express = require("express");
const morgan = require('morgan');

const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

var colors = require("colors");

const PORT = process.env.PORT || 3001;
const app = express();

// import the ROUTES
const routes = require("./routes/api");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  // apollo: key,
  context: authMiddleware,
  playground: true,
  // engine: {
  //   reportSchema: true,
  //   graphVariant: "current"
  // }
  // introspection: true
});

server.applyMiddleware({ app });

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(morgan('tiny'));
app.use("/api", routes);

// Server up static assets
app.use("/images", express.static(path.join(__dirname, "../client/images")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}`.magenta);
    console.log(
      `🚀 Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`.magenta
    );
  });
});
