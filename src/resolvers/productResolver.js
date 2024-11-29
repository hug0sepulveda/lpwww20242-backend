import Product from '../models/product.js';

const productResolver = {
  Query: {
    Products: async () => await Product.find(),
    ProductById: async (_, { id }) => await Product.findById(id),
  },
  Mutation: {
    addProduct: async (_, args) => {
      const product = new Product(args);
      return await product.save();
    },
    updateProduct: async (_, { id, ...updates }) => {
      return await Product.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteProduct: async (_, { id }) => {
      await Product.findByIdAndDelete(id);
      return 'Producto eliminado';
    },
  },
};

export default productResolver;
