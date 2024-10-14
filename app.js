import express from "express";
import bodyParser from "body-parser";
//import mongoose, { connection } from "mongoose";
import mongoose from "mongoose";
//import taskRoutes from "./routes/tasks.js"
const app = express();
 const PORT =3800;
 app.use(bodyParser.json());
 //app.use('/tasks', taskRoutes);
const connectionString= "mongodb+srv://mohammadmohammad:XdZprkTb0U0K6lRw@alex1.684ry.mongodb.net/todoAlex?retryWrites=true&w=majority&appName=Alex1";
//  mongoose.connect("mongodb+srv://mohammadmohammad:alex1234@todolistapp.j4khj.mongodb.net/?retryWrites=true&w=majority&appName=TodoListApp")
//  .then(()=>console.log("Mongo db connected Ali..."))
//  .catch((err)=> console.error("MongoDB error:",err));
const TodoSchema = new mongoose.Schema({
  name:String,
  completed: Boolean
});
 const Todo = mongoose.model("Todo", TodoSchema);
// --get-----------
app.get('/', (req, res) => {
    res.send('To-Do API läuft! (Home Page)');
  });
  app.get("/todos", async (req,res)=>{
      const todos = await Todo.find({});
     res.json(todos);
    //res.send("One route");
  }); 
  // app.get("/todos/:id",(req,res)=>{
  //   res.send("One route")
  // });
  app.post("/todos",async (req,res)=>{
    const todo = await Todo.create(req.body)
    res.json(todo);
    //res.send("One route")
  });
  app.get("/todos/:id", async (req,res)=>{
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
    //res.send("One route")
  });
  app.put("/todos/:id",async (req,res)=>{
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.json(todo)
    //res.send("One route")
  });
  app.delete("/todos/:id",async (req,res)=>{
    const todo =await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
    //res.send("One route")
  });
 async function connectDB(url){
    await mongoose.connect(url)
    console.log("connected to mongoDB Ali..")
  }
  async function start(){
    try{
      await connectDB(connectionString) 
      app.listen(PORT, () => {
      console.log(`Server läuft auf Port ${PORT}`);
  });
    }catch(err){
      console.log(err);
    }
  }
 start();
