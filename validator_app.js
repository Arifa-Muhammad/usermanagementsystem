const express = require('express');
const helmet = require('helmet');
const validator = require('validator');

const app = express();

app.use(express.json());
app.use(helmet());

app.get('/', (req, res) => {
    res.send('User Management System Running');
});

app.post('/signup', (req, res) => {

    const { email } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid Email');
    }

    res.send('Valid Email');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});