const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRouter');
const wishListRouter = require('./routes/wishListRoutes');
const cartRouter = require('./routes/cartRoutes');
const orders = require('./routes/orderRoutes');
const helmet = require('helmet');
const compression = require('compression');
const express = require('express');
const path = require('path');
const app = express();

mongoose.connect(
  "mongodb+srv://debankurdas:amitutul1@cluster0-nvn0n.mongodb.net/medico?retryWrites=true&w=majority",
{ useNewUrlParser: true,useUnifiedTopology: true  })
.then(()=>{
  console.log("Connected to database");
})
.catch(() => {
  console.log("Connection error");
})
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
// app.use("/images", express.static(path.join('backend/images')));
app.use("/images", express.static(path.join('images')));
app.use((req,res,next)=>
{
  res.setHeader(
    'Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With,Content-Type,Accept,access-token"
    );
  res.setHeader(
    'Access-Control-Allow-Methods',
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    next();
})

app.use('/api/users', userRouter);
app.use('/api/categories',categoryRouter);
app.use('/api/products',productRouter);
app.use('/api/wishLists',wishListRouter);
app.use('/api/cartLists',cartRouter);
app.use('/api/orders',orders);
module.exports = app;
