import React, { useState } from 'react'
import { toast } from 'react-toastify';

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to store the success message
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the form submission (e.g., sending data to a server).
    //console.log("Form submitted with data:", formData);
    setSubmitted(true);  // Set submitted to true after the form is submitted
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    toast("Thank you for contacting us!",{
      type: "success",
      position: "top-center",
      theme: "light",
      autoClose: 3000,
    })
  };
  return (
    <>
      <div className="mt-16 bg-slate-900 text-white min-h-screen">
        <div className="">
          <h2 className="font-bold text-2xl ml-8">Contact Us</h2>
            <form onSubmit={handleSubmit} className="font-semibold text-center mt-16 justify-center h-auto  p-16">
              <div className="form-g">
                <label htmlFor="name" className="text-lg ">Name</label>
                <input
                className="w-full mt-2 text-white  rounded bg-slate-500 h-7"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="text-lg">Email</label>
                <input
                className="w-full mt-2 text-white  rounded bg-slate-500 h-7"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="taxt-lg">Message</label>
                <textarea
                className="w-full mt-2 text-white  rounded bg-slate-500 h-10"
                  id="message"
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-1/2 mt-16 bg-blue-700 px-3 py-2 rounded-lg text-white hover:bg-blue-500 transition-all duration-300 font-semibold">Submit</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Contact;