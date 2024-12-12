import React from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';


function Bookscard({ Item ,favourites}) {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Banner ${localStorage.getItem("token")}`,
        bookid: Item._id,
    };
    const handleRemove = ()=>{
        const fetch = async ()=>{
            const res = await axios.put("http://localhost:1000/favorate/delete-book-favorates",{},{ headers });
            //console.log(res.data.message);            
            toast(res.data.message,{
                type: "success",
                position: "top-center",
                theme: "light",
                autoClose: 3000
            });
        }
        fetch();
    }

    return (
    <>
        <div className="mt-4 my-3 p-3">
            <div className="card bg-base-500 w-92 shadow-xl hover:scale-105 duration-300 border h-[400px]">
                <figure>
                    <img
                        src={Item.url}
                        alt="Book"
                        className="object-cover h-52 w-full" // Added class for better image handling
                    />
                </figure>
                <div className="card-body flex flex-col"> {/* Changed to flex-col for better layout */}
                    <Link to={`/bookdetails/${Item._id}`}>
                        <h2 className="card-title flex text-white text-1xl">{Item.title}</h2>
                        <p className="mt-1 font-semibold text-slate-300 flex items-center justify-between">
                            by&nbsp;&nbsp;{Item.author}
                           {/* <div className="badge bg-blue-500 text-white">{Item.category}</div>*/}
                        </p>
                    </Link>
                    <div className="card-actions justify-between mt-2">
                        <div className="badge badge-outline p-4 text-white">&#8377;&nbsp;{Item.price}</div>
                        {/*<Link className="badge badge-outline text-white p-4 cursor-pointer hover:text-blue-500">Buy Now</Link>*/}
                    </div>
                    {favourites && (
                        <button
                            className="w-full mt-4 badge badge-outline text-white p-4 cursor-pointer hover:text-blue-500"
                            onClick={handleRemove}
                        >
                            Remove from Favourites
                        </button>
                        
                    )}
                </div>
            </div>
        </div>
       
       
    </>
    );
}

export default Bookscard;