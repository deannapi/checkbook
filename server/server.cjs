import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

const express = require("express");
import { ApolloServer } from "apollo-server-express";

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
// const path = require("path");

const key = process.env.APOLLO_KEY;
const db = require("./config/connection");

const PORT = process.env.PORT || 3000;
const app = express();

// Apollo server
const server = new ApolloServer({
  apollo: { key },
  typeDefs,
  resolvers,
  context: authMiddleware,
  playground: true,
  engine: { reportSchema: true, variant: "current" },
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Server up static assets
// app.use("/images", express.static(path.join(__dirname, "../client/images")));

// if (process.eventNames.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// }

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
