import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Mobileview() {
  const role = useSelector((state)=> state.auth.role);
  return (
  <>
    { role === "user" && 
      (
        <div className="w-full flex items-center justify-between mt-4 lg:hidden ">
          <Link
            to="/profile"
            className="text-white font-semibold w-full p-1 text-center hover:bg-slate-700 rounded transition-all duration-300">
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-white font-semibold w-full p-1 text-center hover:bg-slate-700 rounded transition-all duration-300">
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-white font-semibold w-full p-1 text-center hover:bg-slate-700 rounded transition-all duration-300">
            Settings
          </Link>
        </div>
      )
    }


    { role === "admin" && 
        (
            <div className="w-full flex items-center justify-between mt-4 lg:hidden ">
              <Link
                to="/profile"
                className="text-white font-semibold w-full p-1 text-center hover:bg-slate-700 rounded transition-all duration-300">
                All Order
              </Link>
              <Link
                to="/profile/addBook"
                className="text-white font-semibold w-full p-1 text-center hover:bg-slate-700 rounded transition-all duration-300">
                Add Book
              </Link>
          
            </div>
        )
    }  
  </>
  )
}

export default Mobileview;