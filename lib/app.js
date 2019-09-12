const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/tags', require('./routes/tags'));
app.use('/api/v1/articles', require('./routes/articles'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
