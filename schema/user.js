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
      firstName: "Tony",
      lastName: "Stark",
      phone: "091234567"
  }
]

const defaultPostData = [{
  id:1,
  userId:1,
  title:"Garph is awsome",
  comment:"good share"
},
{
  id:2,
  userId:1,
  title:"What different with Rest",
  comment:"good share"
},
{
  id:3,
  userId:2,
  title:"I am rich man",
  comment:"oh!!!!"
},
{
  id:4,
  userId:2,
  title:"My super power is money",
  comment:""
}]

const userDefs = gql`
  type User{
    id:Int!,
    firstName:String,
    lastName:String,
    phone:String,
    posts:[Post]
  },
  type Post{
    id:Int!,
    userId:String,
    title:String,
    comment:String,
  }
  extend type Query {
    users: [User],
    user(id:Int!):User,
    posts: [Post]
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
      return _.find(defaultUserData, (v) =>{
        return v.id == id
      })
    },
    posts:() =>{
      return defaultPostData
    }
  },
  Mutation:{
    addUser: function (v,args) {
      let id = _.maxBy(defaultUserData, (o) => { return o.id; });
      let obj = {id: Number(id.id) + 1,firstName: args.firstName, lastName : args.lastName}
      console.log('==============>', v)
      defaultUserData.push(obj)
      return id.id
    },
  },
  User: {
    posts: (user) => {
      return _.filter(defaultPostData, (v) => {return v.userId == user.id})
    }
  }
};

module.exports = { userDefs, userResolvers }