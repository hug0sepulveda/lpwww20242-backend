import Order from "../models/order.js";

const orderResolver = {
  Query: {
    Orders: async () => await Order.find(),
    OrderById: async (_, { id }) => await Order.findById(id),
  },
  Mutation: {
    addOrder: async (_, args) => {
      console.log(args);
      const order = new Order(args);
      return await order.save();
    },
    updateOrder: async (_, { id, ...updates }) => {
      return await Order.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteOrder: async (_, { id }) => {
      await Order.findByIdAndDelete(id);
      return 'Pedido eliminado';
    },
  },
};

export default orderResolver;