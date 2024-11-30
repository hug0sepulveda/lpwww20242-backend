import User from '../models/user.js';
import Order from '../models/order.js'; 

const resolvers = {
  Query: {
    Users: async () => User.find().populate('orderHistory'),
    UsersById: async (_, { id }) => User.findById(id).populate('orderHistory'),
  },
  Mutation: {
    addUser: async (_, { email, password, contactNumber }) => {
      const newUser = new User({ email, password, contactNumber });
      return newUser.save();
    },
    updateUser: async (_, { id, email, password, contactNumber }) => {
      const updateData = {};
      if (email) updateData.email = email;
      if (password) updateData.password = password;
      if (contactNumber) updateData.contactNumber = contactNumber;
      
      return User.findByIdAndUpdate(id, updateData, { new: true }).populate('orderHistory');
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return "Producto eliminado"; 
    },
  },
  User: {
    orderHistory: async (user) => Order.find({ _id: { $in: user.orderHistory } }),
  },
};

export default resolvers;