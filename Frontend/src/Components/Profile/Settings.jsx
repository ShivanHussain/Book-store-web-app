import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import axios from "axios"
import { toast } from 'react-toastify';


function Settings() {
  const [profile , setProfile ] = useState();
  const [values , setValues ] = useState({ address:"" })
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch = async () =>{
      const res = await axios.get("http://localhost:1000/user/user-info",{ headers });
      setProfile(res.data);
      setValues({ address: res.data.address});
    }
    fetch();

  },[])
  const handlechange = (e) =>{
    const { name , value } = e.target;
    setValues({...values , [name]:value})

  };
  const updateaddress = async () => {
    const res = await axios.put("http://localhost:1000/user/update-address",values,{ headers });
    toast(res.data.message,{
      type:"success",
      position: "top-center",
      theme:"light",
      autoClose:3000
    });
  }
  return (
    <>
      <h1 className=" flex font-semibold ml-4  text-3xl ">Settings</h1>
      { !profile && 
        (
          <div className="h-screen flex items-center justify-center"><Loader/></div>

        )
      }

      { profile && 
        ( 
          <div className="h-[100%] p-0 md:p-4 text-slate-300">
            <div className="flex gap-12 mt-8">
              <div>
                <label htmlFor='username'>Username</label>
                <p className="p-2 rounded bg-slate-800 mt-3 font-semibold" id="username">
                  {profile.username}
                </p>
              </div>
              <div>
                <label htmlFor='email'>Email</label>
                <p className="p-2 bg-slate-800 mt-3 rounded font-semibold" id="email">
                  {profile.email}
                </p>
              </div>
              
            </div>
            <div className="mt-8 flex flex-col ">
              <label htmlFor="address">Address</label>
              <textarea className="p-2 rounded rounded bg-slate-800 mt-2 font-semibold"
              row="5"
              placeholder="Address"
              name="address"
              value={values.address}
              onChange={handlechange}/>

            </div>
            <div className="mt-4 flex justify-end">
              <button className=" bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg hover:bg-blue-500  
              hover:text-black transition-all duration-500"
              onClick={updateaddress}>Update</button>

            </div>
          </div>

        )
      }
    </>
  )
}

export default Settings;