const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const BioRoutes = require('./routes/bio');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
/* connecting database */
connectDB();


app.use('/users', BioRoutes);

app.get('/',(req,res) => {
	res.send('Server Running......')
})

/* connecting server */
const port = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${port}`));
