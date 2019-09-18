const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/tags', require('./routes/tags'));
app.use('/api/v1/articles', require('./routes/articles'));
app.use('/api/v1/histories', require('./routes/histories'));
app.use('/api/v1/collections', require('./routes/collections'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
