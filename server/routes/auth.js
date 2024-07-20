import express from 'express';
import { Admin } from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Student } from '../models/Student.js';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (role === 'admin') {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(404).json({ message: "Admin not registered" });
            }

            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Wrong password" });
            }

            const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_Key);
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            return res.json({ login: true, role: 'admin' });

        } else if (role === 'student') {
            const student = await Student.findOne({ username });
            if (!student) {
                return res.status(404).json({ message: "Student not registered" });
            }

            const validPassword = await bcrypt.compare(password, student.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Wrong password" });
            }

            const token = jwt.sign({ username: student.username, role: 'student' }, process.env.Student_Key);
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            return res.json({ login: true, role: 'student' });

        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

    } catch (err) {
        console.error('Error during login:', err); // Log the error on the server
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Invalid Admin" });
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

// Middleware to verify user (either admin or student)
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token is provided" });
    }

    // First, try to verify with Admin_Key
    jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
        if (err) {
            // If verification fails, try with Student_Key
            jwt.verify(token, process.env.Student_Key, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid token" });
                } else {
                    // Token verified with Student_Key
                    req.username = decoded.username;
                    req.role = decoded.role;
                    next();
                }
            });
        } else {
            // Token verified with Admin_Key
            req.username = decoded.username;
            req.role = decoded.role;
            next();
        }
    });
};

router.get('/verify', verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role });
});

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
});

export { router as AdminRouter, verifyAdmin };
