import express from 'express';
//import {Router} from "express";
import Task from '../models/Task.js';
const router = express.Router();
//---get-------------------

  router.get("/todos", async (req,res)=>{
      const todos = await Task.find({});
     res.json(todos);
    //res.send("One route");
  }); 
  router.post("/todos",async (req,res)=>{
    const todo = await Task.create(req.body)
    res.json(todo);
    //res.send("One route")
  });
  router.get("/todos/:id", async (req,res)=>{
    const todo = await Task.findById(req.params.id);
    res.json(todo);
    //res.send("One route")
  });
  router.put("/todos/:id",async (req,res)=>{
    const todo = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json(todo)
    //res.send("One route")
  });
  router.delete("/todos/:id",async (req,res)=>{
    const todo =await Task.findByIdAndDelete(req.params.id);
    res.json(todo);
    //res.send("One route")
  });
  export default router;