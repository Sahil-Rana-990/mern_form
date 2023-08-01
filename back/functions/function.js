const fs = require("fs");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://hemarana9099852230:12345@cluster0.rakth2q.mongodb.net/GRAPHQL"
  )
  .then((res) => console.log("connection succesful"));
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
});
const userModel=new mongoose.model("formusers",userSchema);




const UPLOAD_IMAGE_RETURN_BACK = (req, res) => {
  res.send({ url: `http://localhost:5000/uploads/${req.file.filename}` });
};

const SHOW_IMAGE_THROW_FILE = (req, res) => {
  const imgName = req.params.imgName;
  const readName = fs.createReadStream(`uploads/${imgName}`);
  readName.pipe(res);
};




const STORE_DATA_IN_MONGODB = async(req, res) => {
  const {username,password,image}=req.body;
  const data=new userModel({
    username:username,
    password:password,
    image:image
  })

  await data.save().then(result=>{
    res.send({message:"Data Stored !!"})
  }).catch(err=>{
    console.log(err.message)
  })
};

const FIND_DATA_FROM_USERNAME=async (req,res)=>{
  const {username}=req.body;

  const data=await userModel.findOne({username});
  console.log(data)
  res.send({username:data})
}

module.exports = {
  UPLOAD_IMAGE_RETURN_BACK,
  SHOW_IMAGE_THROW_FILE,
  STORE_DATA_IN_MONGODB,
  FIND_DATA_FROM_USERNAME
};
