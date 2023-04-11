const connectToMongo = require('./db');
require('dotenv').config({path:'./.env'});
const express = require('express')
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
connectToMongo();

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

//Available Routes
app.use('/api/auth',require('./routes/auth/auth.route'));
app.use('/api/admin',require('./routes/admin/admin.route'));
app.use('/api/notice',require('./routes/notice/notice.route'));
app.use('/api/complaint',require('./routes/complaint/complaint.route'));
app.use('/api/maintenance',require('./routes/maintenance/maintenance.route'));
app.use('/api/bill',require('./routes/bill/bill.route'));
// app.use('/api/event',require('./routes/event'));

//Handling page not found
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
   console.log(`Currently Listening at http://localhost:${port}`);
});
