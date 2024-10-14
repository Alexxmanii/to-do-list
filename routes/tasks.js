import express from 'express';
//import {Router} from "express";
import Task from '../models/Task.js';
const router = express.Router();


// GET: Alle Aufgaben abrufen
router.get('/todos', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Neue Aufgabe erstellen
router.post('/todos', async (req, res) => {
  console.log(req.body);
  const task = new Task({
    title: req.body.title,
    completed: req.body.completed
    // title: req.body.title,
    // description: req.body.description,
    // status: req.body.status,
    // dueDate: req.body.dueDate,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: Einzelne Aufgabe abrufen
router.get('/todos/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Aufgabe nicht gefunden' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT: Aufgabe aktualisieren
router.put('/todos/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Aufgabe nicht gefunden' });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Aufgabe löschen
router.delete("/todos/:id",async (req,res)=>{
  const todo =await Task.findByIdAndDelete(req.params.id);
  res.json(todo);
  //res.send("One route")
});
// router.delete('/todos/:id', async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: 'Aufgabe nicht gefunden' });

//     await Task.deleteOne(task);
//     res.json({ message: 'Aufgabe gelöscht' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


export default router;
