import React, { useEffect, useState } from 'react'
import axios from "axios"
import Loader from '../Loader/Loader';
import Bookscard from "../Bookscard.jsx"
import { MdWorkspacePremium } from "react-icons/md";


function Favourites() {
  const [ data , setData ] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
      const fetch = async () =>{
        const res = await axios.get("http://localhost:1000/favorate/get-book-favorates",{ headers });
        setData(res.data.data);
      }
      fetch();

  },[data])
  return (
    <>
        <h1 className="flex font-semibold ml-4  text-3xl ">Favourites</h1>
      {data.length === 0 && (
        <div className="flex items-center justify-center">
          <h3 className="mt-20 font-semibold text-slate-300">No such item
          <p className="flex items-center justify-center text-3xl text-blue-500 mt-2"><MdWorkspacePremium /></p></h3>
        </div>
      )}

      {data === "" ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader/>
        </div>
      ):(
        <div className="h-auto grid grid-cols-1 md:grid-cols-4 mt-4">
          {data.map((item , i) =>(
            <div>
            <Bookscard Item={item} key={i} favourites={true}/>
            </div>
          ))}

        </div>
      )}
       
    </>
  )
}

export default Favourites;