


const express = require('express');
const cors = require('cors');
const config = require('./config.js');
const TechAcademyRoutes = require('./Routes/TechAcademyRoutes.js');
const RocketStudentRoutes = require('./Routes/RocketStudentRoutes.js');
const RocketBabiesRoutes = require('./Routes/RocketBabiesRoutes.js');
const CoursesRoutes = require('./Routes/CoursesRoutes.js');
const AuthRoutes = require('./Routes/AuthRoutes.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors({
  origin: '*', // or explicitly allow the IP address of the Android device
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', TechAcademyRoutes);
app.use('/api', RocketStudentRoutes);
app.use('/api', RocketBabiesRoutes);
app.use('/api', CoursesRoutes);
app.use('/api', AuthRoutes);

app.listen(config.port, '0.0.0.0', () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
