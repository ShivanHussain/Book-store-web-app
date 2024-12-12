import {v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.CLOUD_API_SECRET,
    secure: true,
  });

const uploadimage = async (localfile) => {
    try{
        if(!localfile){
            return null;
        }

        //upload image to cloudinary
        const result = await cloudinary.uploader.upload(localfile, {
            resource_type: "auto"
        })


        //file uploaded successfully
        console.log("hole-res",result);
        console.log("url image",result.url)

    }
    catch(err){
        fs.unlinkSync(localfile);
        return null;
    }
};


module.exports = { uploadimage };
  
  