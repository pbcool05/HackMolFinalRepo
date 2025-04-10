const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const cors = require('cors');
const Authrouter = require('./routes/Authrouter');
const ProductRouter = require('./routes/ProductRouter');
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;
app.get("/ping",(req, res)=>{
    res.send("Pong");
})

// Increase payload size limit (set to 10MB in this example)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyparser.json())
app.use(cors());
app.use('/auth', Authrouter)
app.use('/products', ProductRouter);
app.listen(PORT, ()=>{
    console.log(`server is listening on ${PORT}`);
})

