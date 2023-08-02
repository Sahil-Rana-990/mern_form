const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const {
  UPLOAD_IMAGE_RETURN_BACK,
  SHOW_IMAGE_THROW_FILE,
  STORE_DATA_IN_MONGODB,
  FIND_DATA_FROM_USERNAME,
} = require("./functions/function");
app.use(cors({
  origin:["https://mern-form-front.vercel.app"],
  methods:["GET","POST"]
}));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

//--------------  Route back
app.get("/",(req,res)=>{
  res.send({name:"jhon due"})
});
app.post("/home",(req,res)=>{
  res.send("hello")
  if(req.body.name==="home"){
    res.send({name:"home page"})
  }else{
    res.send({name:req.body})
  }
});

app.post("/api/uploads", upload.single("image"), UPLOAD_IMAGE_RETURN_BACK);
app.get("/uploads/:imgName", SHOW_IMAGE_THROW_FILE);
//STORE_DATA_IN_MONGODB
app.post("/api/storeData",FIND_DATA_FROM_USERNAME);
app.post("/api/getData", FIND_DATA_FROM_USERNAME);

app.listen(5000, () => {
  console.log("PORT 5000");
});
module.exports=app;
