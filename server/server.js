const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnection = require('./db');

dbConnection();

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const passwordResetRoutes = require('./routes/passwordReset');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);

const port = process.env.PORT || 1509;

app.listen(port, () => console.log(`Server is Listening on port ${port}`));

