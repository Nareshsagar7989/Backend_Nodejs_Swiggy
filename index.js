// const express = require('express');


// const dotEnv = require('dotenv');


// const app = express();

// const PORT = 4000;

// dotEnv.config();

// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI)
// .then(() => 
//     console.log('Connected to MongoDB'))
// .catch((error) => {
//     console.log()});

// app.listen(PORT, () =>{
//     console.log(`Server is running on port ${PORT}`)
// });


// app.use('/home',(req,res) => {
//     res.send('Welcome to the Home Page');
// })
const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoute');
const productRoutes = require('./routes/productRoutes');

// 1. Initialize dotenv immediately
dotEnv.config();

const app = express();
const PORT = process.env.PORT || 4000; // Good practice to use env for port too

// 2. Add a console.log to check if the URI is actually being read
console.log("Attempting to connect to:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    // 3. IMPORTANT: Always log the error so you know WHY it failed
    console.error('MongoDB connection error:', error.message);
  });
app.use(bodyParser.json());
app.use('/vendor', vendorRoutes); // Middleware to parse JSON bodies
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);

app.use('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});