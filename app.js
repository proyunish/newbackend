require('dotenv').config()
const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors')


const connectToDatabase = require('./database/index.js');
connectToDatabase();

const adminSeeder = require('./services/adminSeeder.js')
adminSeeder();


const userRoute = require("./routes/userRoute.js")
const kycRoute = require("./routes/kycRoute.js")
const profileRoute = require('./routes/profileRoute.js')
const carDetail = require('./routes/carDetail.js')

const cookies = require('cookie-parser');
app.use(cookies())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: '*',
    credentials: true,
}))
//routes
app.use("/user",userRoute);
app.use("/user/kyc",kycRoute);
app.use("/user/profile",profileRoute);
app.use("/car/",carDetail);

app.get("/",(req,res)=>{
    res.send("WELCOME");
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const server = app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
