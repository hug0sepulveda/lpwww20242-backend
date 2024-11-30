const orderSchema = `#graphql

  type Address {
    comuna: String!
    calle: String!
    numero: Int!
  }

  type OrderProduct {
    product: ID!
    quantity: Int!
  }

  type Order {
    id: ID!
    user: ID!
    products: [OrderProduct!]!
    totalAmount: Float!
    status: String! # Valores posibles: Pending, In Progress, Completed, Cancelled
    orderDetails: String
    address: Address!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    Orders: [Order!]
    OrderById(id: ID!): Order
  }

  type Mutation {
    addOrder(
      user: ID!
      products: [OrderProductInput!]!
      totalAmount: Float!
      address: AddressInput!
      status: String
      orderDetails: String
    ): Order

    updateOrder(
      id: ID!
      products: [OrderProductInput!]
      totalAmount: Float
      status: String
      orderDetails: String
      address: AddressInput
    ): Order

    deleteOrder(id: ID!): String
  }

  input AddressInput {
    comuna: String!
    calle: String!
    numero: String!
  }

  input OrderProductInput {
    product: ID!
    quantity: Int!
  }
`;

export default orderSchema;
