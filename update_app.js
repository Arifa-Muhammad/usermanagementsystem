const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.get('/', (req, res) => {
    res.send('User Management System Running');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});