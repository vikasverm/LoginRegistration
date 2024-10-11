const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/practice_mern');

const JWT_SECRET = 'jgfebekfjkghek46thfy8fje7837bfueh'; 

app.post('/register', async (req, res) => {
    const { email, password, name, dob } = req.body; 

    try {
        const userExists = await FormDataModel.findOne({ email });
        if (userExists) {
            return res.json("Already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await FormDataModel.create({ name, email, password: hashedPassword, dob }); 
        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await FormDataModel.findOne({ email });
        if (!user) {
            return res.json("No records found!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json("Wrong password");
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: "Success" });
    } catch (err) {
        res.status(500).json(err);
    }
});

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log("Token received:", token); 

    if (token) {
        jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
            if (err) {
                console.error("Token verification failed:", err); 
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


app.get('/me', authenticateJWT, async (req, res) => {
    try {
        const user = await FormDataModel.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(404).json("User not found");
        }
        res.json(user); 
    } catch (err) {
        res.status(500).json(err);
    }
});


app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});
