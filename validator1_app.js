const jwt = require('jsonwebtoken');
const express = require('express');
const helmet = require('helmet');
const validator = require('validator');
const bcrypt = require('bcrypt');
const winston = require('winston');

const app = express();

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'security.log' })
    ]
});

app.use(express.json());
//app.use(helmet());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('User Management System Running');
});

app.post('/signup', async (req, res) => {

    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid Email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    logger.info(`New user signed up: ${email}`);

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
    logger.info(`User logged in: ${req.body.email}`);

    res.send({ token });

});
app.listen(3000, () => {
    console.log('Server running on port 3000');
    logger.info('Application started');
});