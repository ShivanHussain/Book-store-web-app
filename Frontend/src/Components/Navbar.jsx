import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector} from "react-redux"

function Navbar() {
    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
    const role = useSelector((state)=> state.auth.role);
    const navbaritem = (
        [
            <li><a href="/" id="1">Home</a></li>,
            <li><a href="/allbooks" id="2">AllBooks</a></li>,
            <li><a href="/cart" id="3">Cart</a></li>,
            <li className="text-blue-400 font-semibold  rounded-lg "><a href="/profile" id="4">Profile</a></li>,
            <li className="text-blue-400 font-semibold  rounded-lg "><a href="/profile">Admin Profile</a></li>,
        ]
    );

    if( isLoggedIn === false ){
        navbaritem.splice(2,3);
        
    }
    if( isLoggedIn === true && role === "user"){
        navbaritem.splice(4,1);
    }


    if( isLoggedIn === true && role === "admin"){
        navbaritem.splice(2,2);
    }


return (
<>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white fixed top-0 left-0 right-0 z-50">
        <div className="navbar ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow text-white">{navbaritem}</ul>
                </div>
                <Link to="/" className="flex">
                    
                    <img src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="image" className="h-10 w-10"/>
                    <a className="text-3xl ml-2 font-bold cursorpointer flex items-center justify-center text-blue-500">BookStore</a>
                </Link>
            </div>
            <div className="navbar-end space-x-3">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-white">{navbaritem}</ul>
                </div>
                        
                {isLoggedIn === false && (
                    <>
                        <div className="flex ">   
                            <div className="hidden md:block ml-2">
                                <a href="/login" className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-900 duration-300 cursor-pointer" 
                                >Login</a>
                            </div>
                            <div className="md:ml-3">
                                <a href="/signup" className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-900 duration-300 cursor-pointer" 
                                >SignUp</a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
</>
  );
}

export default Navbar;