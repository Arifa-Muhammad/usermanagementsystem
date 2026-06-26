const express = require('express');
const helmet = require('helmet');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(helmet());

app.get('/', (req, res) => {
    res.send('User Management System Running');
});

app.post('/signup', async (req, res) => {

    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid Email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    res.send({
        email,
        hashedPassword
    });
});

app.post('/login', (req, res) => {

    const token = jwt.sign(
        { email: req.body.email },
        'your-secret-key'
    );

    res.send({ token });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});