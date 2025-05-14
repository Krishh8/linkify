require('dotenv').config();
import express from 'express';

const app = express();
app.use(cors());
app.use(json());
