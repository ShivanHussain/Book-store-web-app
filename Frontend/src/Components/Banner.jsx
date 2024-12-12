import React from 'react'
import banner from "../../public/Banner.png"
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <>
        <div className="max-w-screen-2xl container  bg-slate-900 mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
            <div className="w-full order-2 md:order-1 md:w-1/2 mt-24 md:mt-32 text-white">
                <div className="space-y-10">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        Hello, welcomes here to learn something{" "}
                        <span className="text-blue-500">new everyday!!!</span>
                    </h1>
                    <br/>
                    <p className="text-xl md:text-2xl text-white ">
                        Uncover captivating stories , enriching knowledge and end less inspiration in our curated collection of books. 
                        
                    </p>
                
                    
                    </div>
                    <br/>
                    <div className="mt-12 ml-16 md:ml-8 ">
                        <Link to="/allbooks"className="text-1xl font-semibold border px-10 py-4 rounded-full ml-8 
                        hover:text-blue-500 hover:border-blue-500 ">
                        Discover more</Link>
                   </div>
            </div>
            <div className=" order-1 w-full md:w-1/2 mt-24 md:mt-35 ">
                <img src={banner} alt="imagebanner" className="md:w-[550px] md:h-[460px] md:ml-12"></img>
            </div>
        </div>

    </>
  );
}
export default Banner;