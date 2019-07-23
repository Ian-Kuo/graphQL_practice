const { gql } = require('apollo-server-koa');

const commonDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const commonResolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

module.exports = {commonDefs, commonResolvers}