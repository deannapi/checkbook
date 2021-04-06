// faker is fake data to auto insert in the db
// npm i faker
const faker = require("faker");

const db = require("../config/connection");
const { User, Transaction } = require("../models");

db.once("open", async () => {
  await User.deleteOne({});
  await Transaction.deleteOne({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertOne(userData);

  // create transactions
  let createdTransactions = [];
  for (let i = 0; i < 500; i += 1) {
    const transactionText = faker.lorem.word(Math.round(Math.random() * 5) + 1);
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];
    const createdTransaction = await Transaction.create({
      transactionText,
      username,
    });
    createdTransactions.push(createdTransaction);
  }

  console.log("Transaction entered.");
  process.exit(0);
});
