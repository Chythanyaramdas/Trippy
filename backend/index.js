
const express = require('express');
const userRoute = require('./routers/userRoute');
const staffRoute=require('./routers/staffRoute');
const adminRoute = require('./routers/Route')
const path=require('path')
const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose');

const cors = require('cors');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://chythanyaramdas03:r6qLSpZhpaf7tC5Z@cluster0.liy0ubf.mongodb.net/trippy?retryWrites=true&w=majority', { useNewUrlParser: true })
// ATLAS_CONNECT=mongodb+srv://chythanyaramdas03:r6qLSpZhpaf7tC5Z@cluster0.liy0ubf.mongodb.net/user_management_system?retryWrites=true&w=majority

  .catch(e => {
    console.error('Connection error', e.message);
  });



const app = express();



app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.use(cors());




// const multer=require('multer')


// const storage =multer.diskStorage({
//     destination : function(req,file,cb){
//       cb(null,path.join(__dirname,'../public/images'))
//     },
//     filename  : function(req,file,cb){
//       const name = Date.now()+'-'+file.originalname;
//       cb(null,name);    
//     }
  
//   });

//   const fileFilter = (req,file,cb)=>{
//     if(file.mimetype ==='image/png' || file.mimetype ==='image/jpg' || file.mimetype ==='image/jpeg' || file.mimetype === 'image/webp'||file.mimetype === 'image/gif'){
//         cb(null,true)
//     }else{
     
//         cb(null,false)
//     }
   
//   }


  
//   const upload=multer({storage:storage,fileFilter:fileFilter})




// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: async function(req, file, cb) {
//     const name = Date.now() + '-' + file.originalname;
//     const path = path.join(__dirname, '../public/images', name);

//     cb(null, path);
//   },
//   filename: function(req, file, cb) {
//     const name = Date.now() + '-' + file.originalname;
//     cb(null, name);
//   },
// });

// const fileFilter = async (req, file, cb) => {
//   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp' ||
//     file.mimetype === 'image/gif') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

const session=require("express-session")

app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false
}));

//=======================routes=============================


app.use('/',require('./routers/userRoute'))
// app.use('/', userRoute);
app.use('/staff',require('./routers/staffRoute'));
// app.use('/staff',staffRoute);
app.use('/admin',require('./routers/Route'));
// app.use('/admin',adminRoute);



app.listen(3001, function () {
    console.log('Server running on port 3001');
});
