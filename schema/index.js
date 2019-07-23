const {commonDefs, commonResolvers} = require('./commonSchema.js');
const {userDefs, userResolvers} = require('./user.js');

const typeDefs = [commonDefs, userDefs]
const resolvers = [commonResolvers, userResolvers]
module.exports = {typeDefs, resolvers}