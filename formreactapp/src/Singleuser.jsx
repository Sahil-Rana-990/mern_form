import axios from "axios";
import { useParams,useNavigate } from "react-router-dom"
import {useEffect,useState} from 'react'

export default function Singleuser() {
  let [data,setdata]=useState({
    image:"",
    password:"",
    username:"",
  })
  let navigate=useNavigate();
  let {user}=useParams();

   
  async function getData(){
    const res=await axios.post("https://mern-form-api.vercel.app/getData",{username:user},{
      headers:{
        "Content-Type":"application/json"
      }
    })

    const response=res.data.username;
    if(response==null){
        navigate("/")
    }else{
      setdata({...response})
      
    }
  }

  useEffect(() => {
      getData()

  }, []);


  return (
    <div className="max-w-[1320px] mx-auto my-[50px]">
      <div className="text-center text-5xl font-medium">{data.username}</div>
      <div className="d-flex justify-center">
        <img src={data.image} alt="" className="w-[530px] h-[530px] mx-auto"/>
      </div>
    </div>
  )
}
