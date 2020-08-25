require("dotenv").config();
const cors=require('cors');

const mongoose = require('mongoose');
const express = require('express')
const app = express()

const employeeRoutes=require("./routes/employee");


mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(() =>{
    console.log("DB CONECTED")
});

app.use(cors({origin:
  process.env.CORS_ORIGIN
}));


app.use(express.json());

app.use(employeeRoutes);


const port = process.env.PORT || 8000

//tested at the start----
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})