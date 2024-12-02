import User from '../models/user.js';
import Order from '../models/order.js'; 

const resolvers = {
  Query: {
    Users: async () => User.find().populate('orderHistory'),
    UsersById: async (_, { id }) => User.findById(id).populate('orderHistory'),
    UsersByEmail: async (_, { email }) => User.findOne({email}).populate('orderHistory'),
  },
  Mutation: {
    addUser: async (_, { email, userName, password, contactNumber }) => {
      const newUser = new User({ email, userName, password, contactNumber });
      return newUser.save();
    },
    updateUser: async (_, { id, email, userName, password, contactNumber }) => {
      const updateData = {};
      if (email) updateData.email = email;
      if (userName) updateData.userName = userName;
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
