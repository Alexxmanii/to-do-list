import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRoutes from './routes/tasks.js';  // Import der Routen
const app = express();
app.use(bodyParser.json());

// ----get---------------------
app.get('/', (req, res) => {
  res.send('To-do List API is running Taqi...');
});
const PORT =3800;
// Verwenden der Task-Routen
app.use('/', taskRoutes); 
//---------
const connectionString= "mongodb+srv://mohammadmohammad:XdZprkTb0U0K6lRw@alex1.684ry.mongodb.net/todoIndex?retryWrites=true&w=majority&appName=Alex1";const TodoSchema = new mongoose.Schema({
    name:String,
    completed: Boolean
  });
   const Todo = mongoose.model("Todo", TodoSchema); async function connectDB(url){
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