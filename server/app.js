const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
const fs = require('fs')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const port = process.env.PORT || 4000;

const userResolver = require('./graphQl/userResolvers.js');
const userTypeDef = fs.readFileSync('./graphQl/users.gql', 'utf8');

const schema = makeExecutableSchema({
  typeDefs: userTypeDef,
  resolvers: userResolver
});

const url = `mongodb://admin:admin123!@ds253468.mlab.com:53468/entertainme`;
mongoose.connect(url, (err) => {
  if (!err) console.log('connected to database');
  else throw new Error(err);
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'home for user instaclone'
  });
})

app.use('/user', require('./routes/user'))

app.use('/graphql', graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(port, () => {
  console.log(`app running on ${port}`);
})