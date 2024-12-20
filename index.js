import express from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://gayu24:@cluster0.7jv8n.mongodb.net/tododb").then(()=>console.log("Database connected"));

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const taskSchema = new mongoose.Schema({
    taskname:String
})

const Task = mongoose.model("task",taskSchema);

app.get("/tasks",async (req,res)=>{
    let tasks;
    try{
        tasks = await Task.find();
        if(tasks.length === 0){
            return res.status(404).json({message:"Tasks not found"});
        }
        return res.status(200).json(tasks);
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Server error"});
    }
})


app.get("/:taskid",async(req,res)=>{
    let id = req.params.taskid;
    let task;
    try {
        task = await Task.findById(id);
        if(!task){
            return res.status(404).json({message:"No task found with this id"});
        }
        return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Server error"});
    }
})

app.post("/create-task",async (req,res)=>{
    let taskname = req.body.taskname;
    try{
        let task = new Task({
            taskname:taskname
        })
        task.save();
        return res.status(201).json({message:"Task created succefully"});
  }catch(err){
        console.log(err);
        return res.status(500).json({error:"Server error"});
    }
})

app.put("/update-task/:taskid",async(req,res)=>{
    let id = req.params.taskid;
    let taskname = req.body.taskname;
    let task;
    try {
        task = await Task.findByIdAndUpdate(id,{taskname:taskname});
        if(!task){
            return res.status(404).json({message:"No task found with this id"});
        }
        return res.status(200).json({message:"Task updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Server error"});
    }
})

app.delete("/delete-task/:taskid",async(req,res)=>{
    let id = req.params.taskid;
    let task;
    try{
        task = await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({message:"No task found with this id"})
        }
        return res.status(200).json({message:"Task deleted successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Server error"});
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
























