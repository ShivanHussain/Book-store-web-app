import React, { useEffect, useState } from 'react'
import axios from "axios"
import Bookscard from '../Components/Bookscard';
import Loader from "../Components/Loader/Loader.jsx"

function Allbooks() {
  const [data , setData ] = useState([]);
  useEffect(()=>{
    const fetch = async () =>{
      //get all book DB
      setData(null);
      const res = await axios.get("http://localhost:1000/book/all-book");
      //console.log(res.data.data)
      setData(res.data.data);
    }
    fetch();
  },[])
  return (
    <> 
      <div className="min-h-screen">
        <div className="bg-slate-900 h-auto px-4 py-2 md:px-20 pt-10">{" "}
          <div className="mt-16 ">
            <h1 className=" text-2xl  md:text-4xl text-white ml-4">All Books</h1>
          </div>

          { data ? (
            <div className="grid grid-cols-1 md:grid-cols-4 mt-2 gap-2">
            { data && data.map((item)=>(
              <div>
                <Bookscard Item={item} key={item._id}/>
              </div>
            ))}
            </div>

            ):(
              <div className="flex items-center justify-center mt-48">
              <Loader/>
            </div> 

            )}
           
        </div>
      </div>
    </>
  );
}

export default Allbooks;