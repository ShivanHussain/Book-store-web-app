import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Profile/Sidebar'
import { Outlet } from "react-router-dom"
import axios from "axios"
import Loader from "../Components/Loader/Loader"
import Mobileview from '../Components/Profile/Mobileview'
function Profile() {
  const [data , setData ] = useState();
  //const isLoggedIn = useSellector();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch = async ()=>{
      setData(null);
      const res = await axios.get("http://localhost:1000/user/user-info",{ headers });
      //console.log(res.data);
      setData(res.data);
    }
    fetch();
  },[])
  return (
    <>
      <div className="mt-16 bg-slate-900 px-2 py-8 md:px-12 flex flex-col md:flex-row gap-4 text-white">
        { data ? (
          <>
            <div className="w-full md:w-1/6 h-auto lg:h-screen">
              <Sidebar data={data}/>
              <Mobileview/>
            </div>
            <div className="w-full md:w-5/6">
              <Outlet/>
            </div>
          </>
        ):(
          <div className="w-full h-[100%] flex items-center justify-center">
            <Loader/>
          </div>

        )}

      </div>
    </>
  );
}

export default Profile;