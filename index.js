const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECT_URL).then(() =>{
  console.log("Database connected successfully!");

  app.listen(process.env.PORT || 3000, () => {
      console.log(`Server started running at port: ${process.env.PORT || 3000}`);
  });
}).catch((err) => {
  console.log('Error connecting to database' + err);
});

app.post('/signin', signin.handleSignin);

app.post('/register', register.handleRegister);

app.get('/profile/:id', profile.handleProfile);

app.put('/image', image.handleImage);

app.post('/imageUrl', image.handleApiCall);

app.put('/editpassword', profile.changePassword);
