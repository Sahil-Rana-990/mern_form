import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
function App() { 
  let navigate=useNavigate();
  let[userData,setuserData]=useState({
    username:"",
    password:"",
    image:"image"
  });

  const changeUserData=async (e)=>{
    const {name,value} = e.target; 
    if(name==="image"){
      const formdata=new FormData();
      formdata.append("image",e.target.files[0])
      const result=await axios.post("https://mern-form-api.vercel.app/api/uploads",formdata,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      setuserData({...userData,image:result.data.url});
      return;
    }
    setuserData({
      ...userData,[name]:value
    })
   
  } 

  const PassDataToBackend=async ()=>{
    const {username,password,image} =userData;
    
    if(username=="" || password== "" ||image===""){
      alert("please, fill the data!!")
    }else{
      const res=await axios.post("https://mern-form-api.vercel.app/api/uploadData",{username,password,image},{
        headers:{
          "Content-Type":"application/json"
        }
      })
      navigate(`/singleuser/${username}`);
      
    }
  }
  return (
    <div className="max-w-[1320px] mx-auto my-[120px]">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            name='username'
            onChange={changeUserData}
          />
        </div>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            name='password'
            onChange={changeUserData}
          />
          
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="file"
            name='image'
            onChange={changeUserData}
            
          />
          
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={PassDataToBackend}
          >
            Sign Up
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      
    </div>
  );
}

export default App;
