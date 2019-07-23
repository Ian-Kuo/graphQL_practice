const { gql } = require('apollo-server-koa');
const _ = require('lodash')

const defaultUserData = [
  {
      id: 1,
      firstName: "Luke",
      lastName: "SkyWaler",
      phone: "0987654321"
  },
  {
      id: 2,
      firstName: "Ana",
      lastName: "Kim",
      phone: "091234567"
  }
]

const userDefs = gql`
  type User{
    id:String!,
    firstName:String,
    lastName:String,
    phone:String
  }
  extend type Query {
    users: [User],
    user(id:Int!):User
  },
  type Mutation{
    addUser(firstName: String, lastName: String, phone: String): User
  }
`;

// Provide resolver functions for your schema fields
const userResolvers = {
  Query: {
    users: () => {
      return defaultUserData
    },
    user: (root, { id }) => {
      return defaultUserData.filter(character => {
        return (character.id = id)
      })[0]
    },
  },
  Mutation:{
    addUser: function (v,args) {
      let id = _.maxBy(defaultUserData, (o) => { return o.id; });
      let obj = {id: Number(id.id) + 1,firstName: args.firstName, lastName : args.lastName}
      console.log('==============>', v)
      defaultUserData.push(obj)
      return id.id
    },
  }
};

module.exports = { userDefs, userResolvers }