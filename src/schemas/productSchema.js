const productSchema = `#graphql

  type Product {
    id: ID!
    name: String!
    categories: [String!]!
    price: Float!
    description: String!
    imageUrl: String!
    isAvailable: Boolean!
  }

  type Query {
    Products: [Product!]
    ProductById(id: ID!): Product
    ProductsByCategory(category: String!): [Product!]
  }

  type Mutation {
    addProduct(
      name: String!
      categories: [String!]!
      price: Float!
      description: String!
      imageUrl: String!
      isAvailable: Boolean
    ): Product

    updateProduct(
      id: ID!
      name: String
      categories: [String!]
      description: String
      price: Float
      imageUrl: String
      isAvailable: Boolean
    ): Product
    
    deleteProduct(id: ID!): String
  }
`;

export default productSchema;
