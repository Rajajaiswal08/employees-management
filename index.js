require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const AdminRouter = require('./routers/AdminRouter');
const DoctourRouter = require('./routers/DoctourRouters');
const BillRouter = require('./routers/BillRouter');
const PackageRouter = require('./routers/packageRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cors({ origin: ['http://localhost:5173'] }));

// Routes
app.use('/admin', AdminRouter);
app.use('/DoctorCategory', DoctourRouter);
app.use('/Package', PackageRouter);
app.use('/bill', BillRouter);

// MongoDB Connection
mongoose.connect(process.env.MONOGOB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('DB connected');
    app.listen(process.env.PORT, () => {
        console.log('Server started on ',process.env.PORT);
    });
})
.catch((error) => {
    console.log('Unable to connect to DB:', error.message);
});
