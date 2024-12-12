import React, { useEffect, useState } from 'react'
import Bookscard from './Bookscard.jsx';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Loader from './Loader/Loader.jsx';

function Freebooks() {
    const [data , setData ] = useState([]);
    useEffect(()=>{
        try{
            const fetch = async () =>{
              setData(null);
                // get recently added book and free book
                const res = await axios.get("http://localhost:1000/book/recent-book");
                setData(res.data.data);

            }
            fetch();
        }catch(err){
            console.log(err);
        }

    },[])
    //react slider css 
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };


  return (
    <>
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
            <div>
                <h1 className="font-semibold text-4xl text-slate-200  ml-4">Recent Added Book</h1>
            </div>
            {data && (
              <div className="mt-4">
                <Slider {...settings}>
                  {data.map((item,i)=>( 
                      <Bookscard Item={item} key={i}/>
                  ))}
                </Slider>
              </div>
            )}
            {!data && (
              <div className="mt-4 my-3 p-3 mb-4 flex items-center justify-center">
                <Loader/>
              </div>
            )}
        </div>
    </>
  );
}

export default Freebooks;