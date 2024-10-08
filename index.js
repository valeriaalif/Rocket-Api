


const express = require('express');
const cors = require('cors');
const config = require('./config.js');
const TechAcademyRoutes = require('./Routes/TechAcademyRoutes.js');
const RocketStudentRoutes = require('./Routes/RocketStudentRoutes.js');
const RocketBabiesRoutes = require('./Routes/RocketBabiesRoutes.js');
const CoursesRoutes = require('./Routes/CoursesRoutes.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', TechAcademyRoutes);
app.use('/api', RocketStudentRoutes);
app.use('/api', RocketBabiesRoutes);
app.use('/api', CoursesRoutes);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
