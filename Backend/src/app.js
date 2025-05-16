require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const cors = require('cors')

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json());

const authRouter = require('./routes/authRouter');
const urlRouter = require('./routes/urlRouter');
const userRouter = require('./routes/userRouter');

app.use('/api/auth', authRouter);
app.use('/api/url', urlRouter);
app.use('/api/user', userRouter);

connectDB().
    then(() => {
        console.log('database connection established.');
        app.listen(process.env.PORT, () => {
            console.log(`Listening on ${process.env.PORT} .......................`);
        });
    }).
    catch((err) => {
        console.log("Something went wrong : " + err)
    })

