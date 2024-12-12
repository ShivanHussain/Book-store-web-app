import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader/Loader';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import { IoMdOpen } from "react-icons/io";
import Userdata from './Userdata';
import { toast } from 'react-toastify';

function Allorder() {
  const [ order , setOrder ] = useState();
  const [option ,setOption ] = useState(-1);
  const [ values , setValues ] = useState({ status: "" });
  const [ userdiv , setUserDiv ] = useState("hidden");
  const [ userdivdata , setUserDivData ] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };


  useEffect(()=>{
    const fetch = async ()=>{
      const res = await axios.get("http://localhost:1000/order/get-order-all",{ headers });
      //console.log("get all data",res.data.data)
      setOrder(res.data.data)
    };
    fetch();
  },[order]);
//console.log(order);

  const change = (e)=>{
    const { value } = e.target;
    setValues({status: value });
  };

  const submitchange = async (i)=>{
    const id = order[i]._id;
    const res = await axios.put(`http://localhost:1000/order/update-status/${id}`,values,{ headers });
    toast(res.data.message,{
      type:"success",
      position:"top-center",
      theme:"light",
      autoClose:3000
    });

  }


  return (
    <>
    { !order && 
      (
        <div className="h-[100%] flex items-center justify-center"><Loader/></div>

      )

    }

    { order && order.length > 0 && 
      (
        <div className="h-[100%] p-0 md:p-4 text-slate-200 mt-2">
            <h2 className="text-2xl md:text-2xl font-semibold text-slate-200 mb-4 flex items-center justify-center">
              All Order 
            </h2>
            <div className="mt-4 bg-slate-800 w-full rounded py-2 px-4 flex gap-2">
              
              <div className="w-[3%]">
                <h1 className="text-center">Sr.</h1>
              </div>
              
              <div className="w-[40%] md:w-[22%]">
                <h1 className="">&nbsp;&nbsp;Books</h1>
              </div>
              
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1 className="">&nbsp;&nbsp;Description</h1>
              </div>
              
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">Price</h1>
              </div>
              
              <div className="w-[30%] md:w-[16%]">
                <h1 className="">Status</h1>
              </div>
              
              <div className="w-[10%] md:w-[5%]">
                <h1 className=""><FaUser /></h1>
              </div>
            </div>

            { order && order.map((item , i)=>
              (
                <div className="bg-slate-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-slate-700 hover:cursor-pointer mt-1">
                  
                  <div className="w-[3%]">
                    <h1 className="text-center">{ i + 1 }.</h1>
                  </div>
                  
                  <div className="w-[40%] md:w-[22%]">
                    <Link 
                      to={`/bookdetails/${item.book._id}`}
                      className="hover:text-blue-500">
                        {item.book.title}
                    </Link>
                  </div>
                  
                  <div className="w-0 md:w-[45%] hidden md:block">
                    <h1 className="">{item.book.desc.slice(0,50)} ...</h1>
                  </div>
                  
                  <div className="w-[17%] md:w-[9%]">
                    <h1 className="">&#8377;&nbsp;{item.book.price}</h1>
                  </div>
                  
                  <div className="w-[30%] md:w-[16%]">
                    <h1 className="font-semibold">
                      <button className="hover:scale-105 trasition-all duration-300" onClick={()=>setOption(i)}>
                        { item.status === "Order placed" ? 
                          (
                            <div className="text-green-500">{item.status}</div>
                          ):item.status === "canceled" ? 
                          (
                            <div className="text-red-500">{item.status}</div>
                          ) 
                          :(
                            <div className="text-yellow-500">{item.status}</div>
                          )
                        }
                        </button>
                        <div className={`${option === i ? "block" : "hidden"}flex mt-4`}>
                          <select name="status" id="" className="bg-slate-800 text-white rounded "
                           value={values.status}
                           onChange={change}>
                            {[
                              "Order placed",
                              "Out of delivery",
                              "canceled",
                            ].map((item, i)=>(
                              <option value={item} key={i}>
                                {item}
                              </option>
                            ))}
                          </select>
                          <button className="text-green-500 hover:text-blue-700 mx-2" onClick={()=>{setOption(-1);submitchange(i)}}>
                            <FaCheck />
                          </button>
                        </div>
                      </h1>
                    </div>
                  
                  <div className="w-[10%] md:w-[5%] ">
                    <button className="text-xl hover:text-blue-700"
                    onClick={()=>{ setUserDiv("fixed");
                                   setUserDivData(item.user)}}>
                      <IoMdOpen />
                    </button>
                  </div>
                </div>
              ))
            }
                        
          </div>

      )
    }

    { userdivdata && 
      (
        <Userdata userdivdata={userdivdata}
                  userdiv={userdiv}
                  setUserDiv={setUserDiv}/>

      )
    }
    </>
  );
};

export default Allorder;