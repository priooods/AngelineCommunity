import express from 'express'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ip from 'ip';
import cors from 'cors';
import UserRoute from './src/module/UserController';
import AuthRoute from './src/module/AuthController';


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/user',UserRoute)
app.use('/auth',AuthRoute)


app.listen(process.env.PORT, () => {
    console.log("Server Running on http://"+ ip.address() +":"+process.env.PORT);
})