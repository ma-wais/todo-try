import {Task} from "../models/task.js"
import ErrorHandler from "../middlewares/errorHandler.js";

export const newTask =async (req,res,next) => {
   try {
    const {title,description} = req.body;
    
    await Task.create({
        title, description , user:req.user,
    })
    res.status(201).json({
        success: true,
        message: "Task added Successfully"
    });   
   } catch (error) {
    next(error)
   }
}
export const getMyTask = async (req,res,next) => {
 try {
    const userId = req.user._id;

    const tasks = await Task.find({ user : userId})
    res.status(200).json({
        success: true,
        tasks,
    })
 } catch (error) {
    next(error)
 }
}
export const updateTask = async (req,res,next) => {
 try {
const {id} = req.params;

const task = await Task.findById(id);
if(!task) return next(new Error("Invalid Id "));
task.completed = !task.completed;

    await task.save();
    res.status(200).json({
        success: true,
        message : "Task Updated",
    })
 } catch (error) {
    next(error)
 }
}
export const deleteTask = async (req,res,next) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if(!task) return next(new Error("Invalid Id "));
        await task.deleteOne();
    
        res.status(200).json({
            success: true,  
            message : "Task deleted",
        })
    } catch (error) {
        next(error)
    }
}