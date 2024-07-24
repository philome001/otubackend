const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app=express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/uploads',express.static('uploads'));
const userRouter = require('./routes/userRoute')
const jobRouter = require('./routes/jobRoute')


app.use(userRouter);
app.use(jobRouter);

//remote host

const URL="mongodb+srv://philosir:Revolution%402021@cluster0.glnnuzk.mongodb.net/OTUDb?retryWrites=true&w=majority"
mongoose.connect(URL)
.catch(err=>console.log(err.message));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open",  ()=> {
  console.log("Connected successfully");
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build','index.html'));
});
const PORT=process.env.PORT||5000;

// Load SSL key, certificate and intermediate certificate
//const options = {
  //  key: fs.readFileSync('path/to/privateKey.key'),
  //  cert: fs.readFileSync('path/to/certificate.crt'),
   // ca: fs.readFileSync('path/to/intermediate.crt')  
//};

// Create HTTPS server
//https.createServer(options, app).listen(443, () => {
  //  console.log('HTTPS server is running!');
//});

app.listen(PORT,()=>console.log(`Server started on port ${PORT}...`));
