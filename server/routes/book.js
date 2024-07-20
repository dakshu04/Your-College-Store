import express from 'express';
import { Book } from '../models/Book.js';
import { verifyAdmin } from './auth.js';

const router = express.Router();

router.post('/add',verifyAdmin, async(req, res) => {
    try{
        const { name, author, imageUrl } = req.body;
        
        const newbook = new Book ({
            name,
            author,
            imageUrl
        })
        await newbook.save();
        return res.status(200).json({ added: true, message: 'Book added successfully' });   
    }
    catch(err) {
        return res.json({message: "Error in adding book yrr"})
    }
})  

router.get('/books', async(req, res) => {
    try{
        const books = await Book.find()
        return res.json(books)
    } catch(err) {
        return res.json(err)
    }
})

export { router as bookRouter }