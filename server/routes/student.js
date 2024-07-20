import express from 'express';
import { Student } from '../models/Student.js';
import bcrypt from 'bcrypt';
import { register } from 'module';
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/register',verifyAdmin, async(req, res) => {
    try{
        const { username, password, roll, grade } = req.body;
        const student = await Student.findOne({username})
        if(student) {
            return res.json({message: "Student is registered"})
        }
        const hashPasswords = await bcrypt.hash(password, 10) 
        const newstudent = new Student ({
            username,
            password: hashPasswords,
            roll: roll,
            grade
        })
        await newstudent.save();
        return  res.json({registered: true})
    }
    catch(err) {
        return res.json({message: "Error in registering student"})
    }
})  

export { router as studentRouter }