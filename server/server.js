const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const { connectDb } = require('./config');
const Schema = require('./schema/schema');
const cors = require('cors');

dotenv.config();
connectDb();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
