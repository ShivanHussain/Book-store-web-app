import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';

function Signup() {

  const [values , setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();


  const change = (e)=>{
    const { name , value } = e.target;
    setValues({...values, [name]:value});
  };


  const submit = async()=>{
    try{
      if( values.username === "" || values.email === "" || values.password === "" || values.address === "" ){
          toast("All field are mendatory",{
            type:"error",
            position: "top-center",
            theme:"light",
            autoClose:3000
          });
        }
      else{
        const res = await axios.post("http://localhost:1000/user/signup",values);
        toast(res.data.message,{
          type:"success",
          position: "top-center",
          theme:"light",
          autoClose:3000
        });
        navigate("/login");

      }


    }catch(err){
      console.log(err.res.data.message);

    }
  }
  return (
    <>
     <div className="mt-16 h-auto bg-slate-900 px-12 py-8 flex items-center justify-center mb-4">
        <div className="bg-slate-800 rounded-lg py-5 px-8 w-full md:w-3/6 lg:w-2/6 ">
          <p className="text-white text-xl">SignUp</p>
          <div className="mt-4">
            <div>
              <label htmlFor="username" className="text-white">Username</label>
              <input type="text" placeholder="Enter your username" className="w-full mt-2 bg-slate-900 
              text-white p-2 rounded-lg outline-none " 
              id="username"
              name="username"
              required
              value={values.username}
              onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="text-white">Email</label>
              <input type="text" placeholder="Enter your email" className="w-full mt-2 bg-slate-900 
              p-2 text-white rounded-lg outline-none" 
              id="email"
              name="email"
              required
              value={values.email}
              onChange={change}/>
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="text-white">Password</label>
              <input type="text" placeholder="Enter your password" className="w-full mt-2 bg-slate-900 p-2 text-white 
              rounded-lg outline-none" 
              id="password"
              name="password"
              required
              value={values.password}
              onChange={change}/>
            </div>
            <div className="mt-4">
              
              <label htmlFor="address" className="text-white">Address</label>
              <textarea type="text" placeholder="Enter your address" col="20" 
              id="address"
              className="w-full bg-slate-900 p-2 text-white  mt-2 rounded-lg outline-none"
              name="address"
              required
              value={values.address}
              onChange={change}></textarea>
            </div>
            <div className="mt-8">
              <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition-all duration-300 "
              onClick={submit}>SignUp</button>
            </div>
          </div>
          <div className="mt-4">
            <span className=" flex justify-center font-semibold text-white">Or</span>
            <p className="flex justify-center mt-4 text-white font-semibold">Already have account?
              &nbsp;<a className="text-blue-500 hover:text-blue-700  hover:link">Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;