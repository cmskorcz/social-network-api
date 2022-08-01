const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Mongoose Connected'))

mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`Server Connected on ${PORT}`);
})