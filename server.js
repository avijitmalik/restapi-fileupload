const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const path = require('path');
const hbs = require('hbs');
const multer = require('multer');


//@connt the temp file..
const tmp_path = path.join(__dirname,'./template/views');

//@set the hbs
app.set('view engine','hbs');
app.set('views',tmp_path);

//@route setup
app.get('/',(req,res) =>{
    res.render('sing');
})

//@multer file
const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null,'Images')
    },
    filename: (req, file, cb)=>{
        console.log(file);
        cb(null,Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage:storage})

//@route post methods..
app.post('/homepage',upload.single('myFile'), (req,res) =>{
    res.render('home');
})
app.listen(PORT,() =>{
    console.log(`Server is running on this port ${PORT}`);
})

