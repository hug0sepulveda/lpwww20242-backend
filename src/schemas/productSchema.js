const productSchema = `#graphql

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    imageUrl: String
    stock: Int!
  }

  type Query {
    Products: [Product!]
    ProductById(id: ID!): Product
  }

  type Mutation {
    addProduct(
      name: String!
      description: String!
      price: Float!
      imageUrl: String
      stock: Int
    ): Product
    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
      imageUrl: String
      stock: Int
    ): Product
    deleteProduct(id: ID!): String
  }
`;

export default productSchema;
