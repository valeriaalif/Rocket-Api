


const express = require('express');
const cors = require('cors');
const config = require('./config.js');
const TechAcademyRoutes = require('./Routes/TechAcademyRoutes.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


//routes
app.use('/api', TechAcademyRoutes);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
