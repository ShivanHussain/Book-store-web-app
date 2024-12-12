import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { authenticationActions } from '../Store/Authentication';
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify';

function Login() {
  const [values , setValues] = useState({
    email: "",
    password: "",
});
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const change = (e)=>{
    const { name , value } = e.target;
    setValues({...values, [name]:value});
  };


  const submit = async()=>{
    try{
      if( values.email === "" || values.password === "" ){
          
          toast('All field are mendatory', {
            type:"error",
            position: "top-center",
            theme:"light",
            autoClose:3000
            });
        }
      else{
        //console.log(values);
        const res = await axios.post("http://localhost:1000/user/signin",values);
        dispatch(authenticationActions.login());
        dispatch(authenticationActions.changeRole(res.data.role));
        localStorage.setItem("id",res.data.id);
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("role",res.data.role);
        //console.log(res.data);
        navigate("/profile");

      }


    }catch(err){
      toast(err.res.data.message,{
        type:"error",
        position:"top-center",
        theme:"light",
        autoClose:3000
      });

    }
  }

  return (
    <>
     <div className="mt-16 h-auto bg-slate-900 px-12 py-8 flex items-center justify-center mb-4">
        <div className="bg-slate-800 rounded-lg py-5 px-8 w-full md:w-3/6 lg:w-2/6 ">
          <p className="text-white text-xl">Login</p>
          <div className="mt-4">
            <div className="mt-4">
              <label htmlFor="email" className="text-white">Email</label>
              <input type="text" placeholder="Enter your email" className="w-full mt-2 bg-slate-900 
              p-2 text-white rounded-lg outline-none" 
              name="email"
              id="email"
              value={values.email}
              onChange={change}
              required/>
              

            </div>
            <div className="mt-4">
              <label htmlFor="password" className="text-white">Password</label>
              <input type="text" placeholder="Enter your password" className="w-full mt-2 bg-slate-900 p-2 text-white 
              rounded-lg outline-none" 
              name="password"
              id="password"
              value={values.password}
              onChange={change}
              required/>

            </div>
            <div className="mt-8">
              <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition-all duration-300 " 
              onClick={submit}>Login</button>
             

            </div>
          </div>
          <div className="mt-4">
            <span className=" flex justify-center font-semibold text-white">Or</span>
            <p className="flex justify-center mt-4 text-white font-semibold">Don't have an account?
              &nbsp;<a className="text-blue-500 hover:text-blue-700  hover:link">SignUp</a>
            </p>
          </div>
        </div>
      </div>

    </>

  );
}

export default Login;