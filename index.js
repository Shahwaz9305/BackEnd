// console.log("Hellow World 1 2")
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config()
const app = express();

const URL = process.env.MONGO_URI

mongoose.connect(URL,{useNewUrlParser: true, UseUnifiedTopology: true}).then(()=>console.log("Connected to mongoDB")).catch(err => console.log("Error connecting to mongoDB", err));

// app.get("/",(req,res)=>{
//     res.send('Hello Express')
// })

app.use((req, res, next) => {
    // Log the request method, path, and IP in the required format
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    
    // Call next() to pass control to the next middleware or route handler
    next();
  });
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/",(req,res)=>{
    // const filePath = path.join(__dirname, './public/index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending the HTML file:', err);
          res.status(500).send('An error occurred while sending the HTML file.');
        }
      });
})

app.get("/json",(req,res)=>{
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({ message: "Hello json".toUpperCase() }); 
      } else {
        res.json({ message: "Hello json" });
      }
})

app.get('/now',(req,res,next)=>{
    req.time = new Date().toString();
    next();
},
(req,res)=>{
    res.json({time: req.time})
})



app.get('/:word/echo',(req,res)=>{
    const word = req.params.word;

    res.json({ echo: word });
})

// app.route(path).get(handler).post(handler)

app.get('/name',(req,res)=>{
    const firstname = req.query.first;
    const lastname = req.query.last;
    res.json({name :`${firstname} ${lastname}`})
})
app.post('/name', (req, res) => {

    const firstName = req.body.first;
    const lastName = req.body.last;
  
    res.json({ name: `${firstName} ${lastName}` });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));