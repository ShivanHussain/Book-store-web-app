import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import Loader from "../Components/Loader/Loader.jsx"
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';


function Bookdetails() {
    const { id } = useParams();
    const [data , setData] = useState([]);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetch = async ()=>{
            setData(null);
            //get data by id 
            const res = await axios.get(`http://localhost:1000/book/book-id/${id}`);
            //console.log(res.data);
            setData(res.data.data);
        }
        fetch();

    },[])
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Banner ${localStorage.getItem("token")}`,
        bookid: id,
    };
    const handleFavourites = () =>{
        const fetch = async () =>{
            const res = await axios.put("http://localhost:1000/favorate/add-book-favorates",{},{ headers });
            toast(res.data.message,{
                type:"success",
                position: "top-center",
                theme:"light",
                autoClose:3000
            });
        };
        fetch();
    }

    const handleCart = () =>{
        const fetch = async () =>{
            const res = await axios.put("http://localhost:1000/cart/add-to-card",{},{ headers });
            toast(res.data.message,{
                type:"success",
                position: "top-center",
                theme:"light",
                autoClose:3000
            });
        };
        fetch();
    }
    const deletebook = async ()=>{
        const res = await axios.delete("http://localhost:1000/book/delete-book",{ headers });
        //alert(res.data.message);
        toast(res.data.message,{
            type:"success",
            position: "top-center",
            theme:"light",
            autoClose:3000
        });
        navigate("/allbooks");
    }
  return (
    <> 
        {data ? (
        <div className="mt-16 px-4 md:px-12 py-8 bg-slate-900 flex flex-col lg:flex-row gap-8">
            <div className=" w-full lg:w-3/6 p-2">
                {" "}
                <div className="flex flex-col lg:flex-row justify-around bg-slate-800 p-12 rounded ">
                    {" "}
                    <img src={data.url} alt="image" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"/>
                {isLoggedIn === true && role === "user" && (
                    <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0 ">
                        <button className="bg-white rounded lg:rounded-full p-2 text-1xl md:text-2xl text-red-600 
                        flex items-center justify-center hover:text-red-800 "
                        onClick={handleFavourites}>
                            <FaHeart /><span className="ms-2 block lg:hidden hover:text-red-800 ">Favourites</span>
                        </button >
                        <button className="bg-white rounded lg:rounded-full p-2 text-1xl md:text-2xl text-blue-600  md:mt-4 
                        flex items-center justify-center hover:text-blue-800"onClick={handleCart}>
                            <FaShoppingCart /><span className="ms-2 block lg:hidden hover:text-blue-800 ">Add to cart</span>
                        </button>
                    </div>
                )}
                {isLoggedIn === true && role === "admin" && (
                    <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0 ">
                        <Link
                        to={`/updatebook/${id}`} 
                        className="bg-white rounded lg:rounded-full p-2 text-1xl md:text-2xl text-red-600 
                        flex items-center justify-center hover:text-red-800 ">
                            <FaEdit /><span className="ms-2 block lg:hidden hover:text-red-800 ">Edit Book</span>
                        </Link>
                        <button className="bg-white rounded lg:rounded-full p-2 text-1xl md:text-2xl text-blue-600  md:mt-4 
                        flex items-center justify-center hover:text-blue-800"
                        onClick={deletebook}>
                            <MdDelete /><span className="ms-2 block lg:hidden hover:text-blue-800 ">Delete Book</span>
                        </button>
                    </div>
                )}
                </div>
            </div>
            <div className="p-4 w-full lg:w-3/6 border rounded-lg">
                <h1 className="text-4xl text-white font-semibold ">{data.title}</h1>
                <p className="text-white-900 mt-2 text-xl ">&nbsp;&nbsp;&nbsp;&nbsp;by&nbsp;{data.author}</p>
                <p className="text-slate-400 mt-4 text-xl ">{data.desc}</p>
                <p className="mt-4 flex items-center justify-start text-white">
                    <GrLanguage className="me-3"/>{data.language}
                </p>
                <p className="mt-4 text-white text-3xl font-seimbold ">
                    Price&nbsp;:&nbsp;&#8377;&nbsp;{data.price}{" "}
                </p>

            </div>

        </div>):(
            <div className="min-h-screen flex items-center justify-center">
                <Loader/>
            </div>
        )}
    </>
  )
}

export default Bookdetails;