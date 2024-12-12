import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { authenticationActions } from "../../Store/Authentication";

function Sidebar({ data }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state)=> state.auth.role);
  const handlelogout = ()=>{
    dispatch(authenticationActions.logout());
    dispatch(authenticationActions.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    history("/");
  }

  return (
    <>
      <div className="bg-slate-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%] ">
        <div className="flex flex-col items-center justify-center">
          <img src={data.avatar} className="h-[12vh] "/>
          <p className="mt-3 text-xl text-white font-semibold ">{data.username}</p>
          <p className="mt-1 text-normal text-white">{data.email}</p>
          <div className="w-full mt-4 h-[1px] bg-slate-500 hidden lg:block"></div>
        </div>
        {role === "user" && 
          (
            <div className="w-full flex-col items-center justify-center hidden lg:flex">
              <Link
                to="/profile"
                className="text-white font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300">
                Favourites
              </Link>
              <Link
                to="/profile/orderHistory"
                className="text-white font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300">
                Order History
              </Link>
              <Link
                to="/profile/settings"
                className="text-white font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300">
                Settings
              </Link>
            </div>
          )
        }
        {role === "admin" && 
          (
            <div className="w-full flex-col items-center justify-center hidden lg:flex">
              <Link
                to="/profile"
                className="text-white font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300">
                All Order
              </Link>
              <Link
                to="/profile/addBook"
                className="text-white font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300">
                Add Book
              </Link>
            </div>
          )
        }
        <button className="w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center px-2 py-2 
         rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300"
         onClick={handlelogout}>
          Logout<IoLogOut className="ms-2"/></button>
      </div>
    </>
  )
}

export default Sidebar;