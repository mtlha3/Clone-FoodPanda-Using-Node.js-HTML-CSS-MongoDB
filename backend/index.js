const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

const foodRoutes = require('./routes/addFoodsroute');

const PORT = process.env.PORT || 3050;
const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://mohdtlha3:talha123456@fooddbcluster.ckom5wd.mongodb.net/';

app.use('/food', foodRoutes);

mongoose
  .connect(connectionString,{ dbName: "FoodDB" })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
