// // const mongoose = require('mongoose');

// // const connectDB = async () => {
// //   const url = "mongodb+srv://aditya:aditya@inventrix.duw1f.mongodb.net/?retryWrites=true&w=majority&appName=Inventrix"
// //   try {
// //     const conn = await mongoose.connect(  url , {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     console.log(`MongoDB Connected: ${conn.connection.host}`);
// //   } catch (error) {
// //     console.error(`Error: ${error.message}`);
// //     process.exit(1); // Exit process with failure
// //   }
// // };

// // module.exports = connectDB;
// const mongoose = require('mongoose');
// const User = require('../models/usermodel');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect('mongodb://localhost:27017');

//     console.log(`MongoDB Connected: ${conn.connection.host}`);

//     // Check if user Trisha exists and add if not
//     const existingUser = await User.findOne({ name: 'Trisha' });

//     if (!existingUser) {
//       const newUser = new User({
//         name: 'Trisha',
//         email: 'trisha@example.com',
//         password: 'securepassword123', // Provide a password field
//       });

//       await newUser.save();
//       console.log('New user named "Trisha" has been added to the database!');
//     } else {
//       console.log('User "Trisha" already exists in the database.');
//     }
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1); // Exit the process on error
//   }
// };

// module.exports = connectDB;
