const express = require("express")
const mongoose= require('mongoose')
const cors = require('cors')
const TodoModel = require('./models/todoModel')


const app =express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://cmkeerthana2001:Keerthana%40123@cluster0.77xtah3.mongodb.net/database9?retryWrites=true&w=majority&appName=Cluster0");

app.post("/tasks",(req,res)=>{
    const task =req.body.task;
    TodoModel.create({task:task})
    .then(result =>{res.json(result)})
    .catch(err=> res.json(err))
})
app.get("/tasks",(req,res)=>{
    TodoModel.find()
    .then(result=> res.json(result))
    .catch(err=> res.json(err))
})
app.put("/task/:id",(req,res)=>{
const {id}= req.params;
TodoModel.findByIdAndUpdate({_id:id},{done:true})
.then(result=>res.json(result))
.catch(err=> res.json(err))
})
app.delete('/task/:id',(req,res)=>{
    const {id}= req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
.catch(err=> res.json(err))
})
app.listen(3001,()=>{
    console.log("server is running");
})