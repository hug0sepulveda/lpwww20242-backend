const userSchema = `#graphql

type User {
  id: ID!
  email: String!
  userName: String!,
  password: String!
  contactNumber: String!
  orderHistory: [Order!]
}

type Order {
  id: ID!
}

type Query {
  Users: [User!]!
  UsersById(id: ID!): User
  UsersByEmail(email: String!): User
}

type Mutation {
  addUser(
    email: String!,
    userName: String!,
    password: String!,
    contactNumber: String!
  ): User!

  updateUser(
    id: ID!, 
    email: String,
    userName: String,
    password: String,
    contactNumber: String
  ): User!

  deleteUser(id: ID!): Boolean!
}
`;

export default userSchema;

