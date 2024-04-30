require('dotenv/config');
const app = require('./app');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_LOCAL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connected to mongoDb"))
    .catch(err => console.error("MongoDB connection failed", err));

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})