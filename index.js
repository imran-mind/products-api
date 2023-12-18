const express = require('express');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const app = express();
require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8080;
// to parse POST json body
app.use(express.json());

app.use('/api/v1', productRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})