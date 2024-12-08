require('dotenv').config();
const mongoose = require('mongoose');
const Invoice = require('./models/Invoice');
const User = require('./models/User'); // Assuming you have a User model

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  populateInvoices();
}).catch(err => console.log(err));

const populateInvoices = async () => {
  try {
    const user = await User.findOne(); // Find any user to associate with the invoices

    if (!user) {
      console.error('No user found. Please ensure there is at least one user in the database.');
      process.exit(1);
    }

    const invoices = [
      {
        userId: user._id,
        amount: 150.50,
        dueDate: new Date('2024-07-01'),
        recipient: 'Client A',
        status: 'due',
      },
      {
        userId: user._id,
        amount: 200.00,
        dueDate: new Date('2024-06-25'),
        recipient: 'Client B',
        status: 'past-due',
      },
      {
        userId: user._id,
        amount: 75.75,
        dueDate: new Date('2024-06-30'),
        recipient: 'Client C',
        status: 'due',
      },
      {
        userId: user._id,
        amount: 300.00,
        dueDate: new Date('2024-06-15'),
        recipient: 'Client D',
        status: 'past-due',
      },
      {
        userId: user._id,
        amount: 500.00,
        dueDate: new Date('2024-07-05'),
        recipient: 'Client E',
        status: 'due',
      }
    ];

    await Invoice.insertMany(invoices);
    console.log('Invoices populated successfully');
  } catch (error) {
    console.error('Error populating invoices', error);
  } finally {
    mongoose.connection.close();
  }
};
