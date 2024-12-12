import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cartdetails() {
  let count = 0;
    const [ profile , setProfile ] = useState();
    const [ total , setTotal ] = useState(0);
    const [ cart ,setCart ] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();


  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
} = useForm();

  useEffect(()=>{
    const fetch = async () =>{
      const res = await axios.get("http://localhost:1000/user/user-info",{ headers });
      setProfile(res.data);
    }
    fetch();

  },[]);

  //get details of user cart
  useEffect(()=>{
    const fetch = async ()=>{
      const res = await axios.get("http://localhost:1000/cart/get-to-card",{ headers });
      //console.log(res.data.data);
      setCart(res.data.data);
    }
    fetch();
  },[cart]);

  //handle total amount of book
  useEffect(()=>{
    if( cart && cart.length > 0){
      let total = 0;
      cart.map((item)=>{
        total += item.price;
        count++;

      });
      setTotal(total);
      total = 0;
    }
  },[cart]);


  const onSubmit = async ()=>{
    try{
      const res = await axios.post("http://localhost:1000/order/place-order",
        { order: cart },
        { headers }
      );
      toast(res.data.message,{
        type: "success",
        position: "top-center",
        theme: "light",
        autoClose: 2000
      });
      setTimeout(()=>{
        navigate("/profile/orderHistory");

      },2000)
      //

    }catch(err){
      toast("Failed to place an order",{
        type: "success",
        position:"top-center",
        theme:"light",
        autoClose:3000
      });
      //console.log("Error place an order",err);
    }
  }
  return (
    <>
    <section className="mt-12">
            <div className="min-h-screen p-6 bg-slate-900 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-bold text-xl text-white mb-2">Cash On Delevary</h2>
                            <p className="text-white mb-2 taxt-1xl font-semibold ">Total Price:&nbsp;&#8377;&nbsp;{total}</p>
                            <p className="text-white mb-6  taxt-1xl font-semibold">Items :&nbsp;{cart.length}&nbsp;&nbsp;Books</p>
                        </div>

                        
                            <div className="bg-slate-800 rounded shadow-lg p-2 px-2 md:p-4 mb-6">
                                <form  onSubmit={ handleSubmit(onSubmit) } className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-2">{/*} */}
                                    <div className="text-white">
                                        <p className="font-bold text-lg mb-4">Personal Details</p>
                                        <p className="mt-2 font-semibold text-white">Please fill out all the fields.</p>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">



                                            <div className="md:col-span-5 text-white">
                                                <label htmlFor="name" className="text-white font-semibold">Full Name</label>
                                                <input
                                                    {...register("name", { required: true })}
                                                    type="text" 
                                                    name="name" 
                                                    id="name" 
                                                   
                                                    className="h-10  mt-1 rounded px-4 w-full bg-slate-900" 
                                                    placeholder="Full Name"/>
                                            </div>

                                            <div className="md:col-span-5 text-white">
                                                <label html="email" className="text-white font-semibold">Email Address</label>
                                                <input

                                                    type="text" 
                                                    name="email" 
                                                    id="email"
                                                    
                                                    className="h-10 mt-1 rounded px-4 w-full bg-slate-900"
                                                    disabled
                                                    defaultValue={profile?.email}
                                                    placeholder="email@domain.com" />
                                            </div>



                                            <div className="md:col-span-5 text-white">
                                                <label html="phone" className="text-white font-semibold">Phone Number</label>
                                                <input
                                                    {...register("phone", { required: true })}
                                                    type="number" 
                                                    name="phone" 
                                                    id="phone"
                                                    
                                                    className="h-10  mt-1 rounded px-4 w-full bg-slate-900" 
                                                    placeholder="+123 456 7890" />
                                            </div>

                                            <div className="md:col-span-3 text-white">
                                                <label htmlFor="address" className="text-white font-semibold">Address / Street</label>
                                                <input
                                                    {...register("address", { required: true })}
                                                    type="text" 
                                                    name="address" 
                                                    id="address" 
                                                    
                                                    className="h-10  mt-1 rounded px-4 w-full bg-slate-900" 
                                                    placeholder="Address" />
                                            </div>

                                            <div className="md:col-span-2 text-white">
                                                <label htmlFor="city" className="text-white font-semibold">City</label>
                                                <input
                                                    {...register("city", { required: true })}
                                                    type="text" 
                                                    name="city" 
                                                    id="city"
                                                    
                                                    className="h-10 mt-1 rounded px-4 w-full bg-slate-900" 
                                                    placeholder="City" />
                                            </div>

                                            <div className="md:col-span-2 text-white">
                                                <label htmlFor="country" className="text-white font-semibold">Country / region</label>
                                                <div className="h-10 bg-slate-900 flex rounded items-center mt-1">
                                                    <input
                                                        {...register("country", { required: true })}
                                                        type="text" 
                                                        name="country" 
                                                        id="country"
                                                        
                                                        placeholder="Country" 
                                                        className="h-10 mt-1 rounded px-4 w-full bg-slate-900" />
                                                </div>
                                            </div>

                                            <div className="md:col-span-2 text-white">
                                                <label htmlFor="state" className="text-white font-semibold">State / province</label>
                                                <div className="h-10 bg-slate-900 flex rounded items-center mt-1">
                                                    <input
                                                        {...register("state", { required: true })}
                                                        type="text" 
                                                        name="state" 
                                                        id="state"
                                                         
                                                        placeholder="State" 
                                                        className="h-10 mt-1 px-4 rounded w-full bg-slate-900" />
                                                </div>
                                            </div>

                                            <div className="md:col-span-1 text-white">
                                                <label htmlFor="zipcode" className="text-white font-semibold">Pincode</label>
                                                <input
                                                    {...register("zipcode", { required: true })}
                                                    type="number" 
                                                    name="zipcode" 
                                                    id="zipcode"
                                                    
                                                    className="h-10  mt-1 rounded px-4 w-full bg-slate-900" 
                                                    placeholder="Zipcode" />
                                            </div>

                                            <div className="md:col-span-5 mt-4 text-white">
                                                <div className="inline-flex items-center">
                                                    <input
                                                        onChange={(e) => setIsChecked(e.target.checked)}
                                                        type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                                                    <label htmlFor="billing_same" className="ml-2 text-white font-semibold">
                                                      I am aggree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> 
                                                      and <Link className='underline underline-offset-2 text-blue-600'>Shoping Policy.</Link>
                                                    </label>
                                                </div>
                                            </div>



                                            <div className="md:col-span-5 text-right">
                                                <div className="inline-flex items-end">
                                                    <button
                                      
                                                    disabled={!isChecked}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Place an Order</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        


                    </div>


                </div>
            </div>
        </section>
        <ToastContainer/>
    </>
  )
}

export default Cartdetails;