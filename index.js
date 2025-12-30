const express=require('express');
const cors=require('cors');
 const mongoose=require('mongoose');
 const student=require('./models/studentmodel');
require('dotenv').config({path:'./.env'});
 const app=express();
 app.use(express.json());
 app.use(cors({
   methods:["GET","POST","PUT","DELETE"],
   origin:"*"
 }));
  mongoose.connect(process.env.MONGO_DB)
   .then(()=>console.log("mongodb connected"))
 .catch(()=>console.log("error"))
 app.get("/students",async(req,res)=>{
    const students=await student.find();
    res.json(students);
 });
 app.get('/',()=>{
   res.json({mes:"hello"})
 })
 app.post("/students",async(req,res)=>{
    const students=await student.create(req.body)
    res.json(students)
 });
 app.put("/students/:id",async(req,res)=>{
   const {name,age}=req.body;
   const updated=await student.findByIdAndUpdate(req.params.id,{name,age},{new:true})
    res.json(updated)
 });
  app.delete("/students/:id",async(req,res)=>{
   
   const deleted=await student.findByIdAndDelete(req.params.id)
    res.json(deleted)
 });
 app.listen(5000,()=>{console.log(`server is running on ${process.env.PORT}`)});