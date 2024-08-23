import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB';

dotenv.config(); 

const port = process.env.PORT||8080;

const app = express();

connectDB().then(()=>{
  app.listen(port,()=>{
    console.log(`Server start listening on port: ${port}`);
  });  
})
