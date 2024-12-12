import React from 'react'
import { RxCross1 } from "react-icons/rx";

function Userdata({ userdivdata , userdiv , setUserDiv }) {
  return (
    <>
        <div className={`${userdiv} top-0 left-0 h-screen w-full bg-slate-900 opacity-70`}></div>{" "}
        <div className={`${userdiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
            <div className="rounded p-8 w-[80%] md:w-[50%] lg:w-[25%] border rounded-xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-blue-600">User Information</h1>
                    <button onClick={()=>{setUserDiv("hidden")}}><RxCross1 className="text-blue-500 text-2xl" /></button>
                </div>
                <div className="mt-4 text-xl text-blue-500 ml-2">
                    <label htmlFor="username">Username{" "}:{"  "}<span className="font-semibold">{userdivdata.username}</span></label>

                </div>

                <div className="mt-4 text-xl text-blue-500 ml-2">
                    <label htmlFor="email">Email{" "}:{"  "}<span className="font-semibold">{userdivdata.email}</span></label>

                </div>

                <div className="mt-4 text-xl text-blue-500 ml-2">
                    <label htmlFor="address">Address{" "}:{"  "}<span className="font-semibold">{userdivdata.address}</span>
                    </label>

                </div>

            </div>

        </div>
    </>
  );
};

export default Userdata;