const express = require('express');
const cors = require('cors');

const userRoutes = require('../routes/user.routes');

const app = express();

app.set('port', process.env.PORT || 3000);
// middelwares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// endpoint
app.use('/admin', userRoutes);
module.exports = app;