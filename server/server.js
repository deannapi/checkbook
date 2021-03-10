const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
// const bodyParser = require("body-parser");
// const cors = require("cors");

// import mongoose db
const db = require("./config/connection");

const PORT = process.env.PORT || 3000;
const app = express();

// Apollo server
const server = new ApolloServer({
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
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.eventNames.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
