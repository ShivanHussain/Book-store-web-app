import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader/Loader';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { BsFillCartXFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function Cart() {
  const [ cart ,setCart ] = useState();
  const [ total , setTotal ] = useState(0);
  const navigate = useNavigate();


  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };

  //get details of user cart
  useEffect(()=>{
    const fetch = async ()=>{
      const res = await axios.get("http://localhost:1000/cart/get-to-card",{ headers });
      //console.log(res.data.data);
      setCart(res.data.data);
    }
    fetch();
  },[cart]);
  //console.log(cart);

  //delete book from your cart
  const handledeletecart = (bookid)=>{
    const fetch = async ()=>{
      const res = await axios.put(`http://localhost:1000/cart/remove-to-card/${ bookid }`,{},{ headers });
      toast(res.data.message,{
        type: "success",
        position:"top-center",
        theme:"light",
        autoClose:3000
      });
      

    }
    fetch();
  };

  //handle total amount of book
  useEffect(()=>{
    if( cart && cart.length > 0){
      let total = 0;
      cart.map((item)=>{
        total += item.price;
      });
      setTotal(total);
      total = 0;
    }
  },[cart]);

  return (
    <>
      <div className="bg-slate-900 mt-16 px-12 h-auto py-8">


        {!cart && (
          <div className="h-screen flex items-center justify-center"><Loader/></div>)
        }


        { cart && cart.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-3xl lg:text-5xl font-semibold ">Empty Cart</h1>
              <BsFillCartXFill className="lg:h-[20vh] text-7xl"/>
            </div>
          </div>)
        }


        { cart && cart.length > 0 &&(
          <div className="h-auto">
            <h1 className="text-5xl font-semibold mb-8 text-slate-300">Your Cart</h1>
            { cart.map(( item )=>(
              <div className="w-full my-4 rounded flex flex-col md:flex-row p-4 justify-between items-center border rounded-lg border-slate-600" key={item._id}>
                <img src={item.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"/>
                <div className="w-full md:w-auto">
                  <h1 className="text-2xl font-semibold text-start text-slate-300 mt-2 md:mt-0">{item.title}</h1>
                  <p className="text-normal mt-2  hidden lg:block">{item.desc.slice(0,100)}......</p>
                  <p className="text-normal mt-2 md:block lg:hidden">{item.desc.slice(0,65)}.....</p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between ">
                  <h2 className="text-3xl font-semibold flex text-slate-300 ">&#8377;&nbsp;{item.price}</h2>
                  <button className="bg-red-500 text-black text-1xl border border-red-700 rounded p-2 ms-12 hover:"
                  onClick={()=>handledeletecart(item._id)}><MdDeleteForever className="text-1xl md:text-2xl"/></button>
                </div>
              </div>))
            }
          </div>)
        }

        { cart && cart.length > 0 && (

          <div className="mt-20 w-full flex justify-end">{/*w-full flex items-center justify-end */}
            <div className="p-4 bg-slate-800 rounded">
              <h1 className="text-3xl text-white font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-white">
                <h2>{cart.length}&nbsp;&nbsp;Books</h2>
                <h2>&#8377;&nbsp;{total}</h2>
              </div>
              <div className="w-[100%] mt-3">
              <Link to="/allbooks" className="bg-blue-500 rounded px-4 py-2 flex justify-center w-full font-semibold text-black hover:bg-blue-600 mb-2"
                >Add Book</Link>
                <Link to="/Cartdetails" className="bg-blue-500 rounded px-4 py-2 flex justify-center w-full font-semibold text-black hover:bg-blue-600"
                >Checkout</Link>
              </div>
            </div>
          </div>)
        }

      </div>
    </>
  );
}

export default Cart;