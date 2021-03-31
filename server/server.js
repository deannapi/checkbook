const path = require("path");
const express = require("express");

const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const key = process.env.APOLLO_KEY;

const app = express();
const PORT = process.env.PORT || 3000;

// Apollo server
const server = new ApolloServer({
  apollo: {key: key},
  typeDefs,
  resolvers,
  context: ({authMiddleware}) => ({authMiddleware}),
  playground: true
  // engine: {
  //   reportSchema: true,
  //   variant: "current",
  // },
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Server up static assets
app.use("/images", express.static(path.join(__dirname, "../client/images")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/public")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 API server running on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
