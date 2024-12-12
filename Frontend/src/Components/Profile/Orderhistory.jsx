import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

function Orderhistory() {
  const [ orderhis , setOrderhis ] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch = async ()=>{
      const res = await axios.get("http://localhost:1000/order/get-order-his",{ headers });
      setOrderhis(res.data.data);
    };
    fetch();

  },[])

  return (
    <>
      <h1 className=" flex font-semibold ml-4  text-3xl ">Order History</h1>
      { !orderhis && 
        (
          <div className="h-screen flex items-center justify-center ">
            <Loader/>
          </div>
        )

      }


      { orderhis && orderhis.length === 0 && 
        (
          <div className="h-[80vh] p-4 text-slate-300">
            <div className="h-[100%] flex flex-col items-center justify-center">
              <h1 className="text-5xl font-semibold text-slate-600 mb-8">No order history</h1>
            </div>
          </div>
        )
      }


      { orderhis && orderhis.length > 0 && 
        (
          <div className="h-[100%] p-0 md:p-4 text-slate-200 mt-2">
            <h2 className="text-2xl md:text-2xl font-semibold text-slate-200 mb-4 flex items-center justify-center">
              Your Order History
            </h2>
            <div className="mt-4 bg-slate-800 w-full rounded py-2 px-4 flex gap-2">
              
              <div className="w-[3%]">
                <h1 className="text-center">Sr.</h1>
              </div>
              
              <div className="w-[22%]">
                <h1 className="">&nbsp;&nbsp;Books</h1>
              </div>
              
              <div className="w-[45%]">
                <h1 className="">&nbsp;&nbsp;Description</h1>
              </div>
              
              <div className="w-[9%]">
                <h1 className="">Price</h1>
              </div>
              
              <div className="w-[16%]">
                <h1 className="">Status</h1>
              </div>
              
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="">Mode</h1>
              </div>
            </div>

            { orderhis.map((item , i)=>
              (
                <div className="bg-slate-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-slate-700 hover:cursor-pointer mt-1">
                  
                  <div className="w-[3%]">
                    <h1 className="text-center">{ i + 1 }.</h1>
                  </div>
                  
                  <div className="w-[22%]">
                   <Link 
                      to={`view-book-details/${item.book._id}`}
                      className="hover:text-blue-500">
                        {item.book.title}
                    </Link>
                  </div>
                  
                  <div className="w-[45%]">
                    <h1 className="">{item.book.desc.slice(0,50)} ...</h1>
                  </div>
                  
                  <div className="w-[9%]">
                    <h1 className="">&#8377;&nbsp;{item.book.price}</h1>
                  </div>
                  
                  <div className="w-[16%]">
                    <h1 className="font-semibold text-green-500">
                      { item.status === "Order placed" ? 
                        (
                          <div className="text-green-500">{item.status}</div>
                        ):item.status === "Canceled" ? 
                        (
                          <div className="text-red-500">{item.status}</div>
                        ) 
                        :(
                          <div className="text-yellow-500">{item.status}</div>
                        )
                      }
                    </h1>
                  </div>
                  
                  <div className="w-none md:w-[5%] hidden md:block">
                    <h1 className="text-sm text-slate-200">COD</h1>
                  </div>
                </div>
              ))
            }
                        
          </div>
        )
      }

    </>
  );
}

export default Orderhistory;