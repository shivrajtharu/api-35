const { CloudinaryConfig } = require('../config/config');
const cloudinary = require('cloudinary').v2;
const fs = require("node:fs");

class FileUploadService{
    constructor(){
        cloudinary.config({
            cloud_name: CloudinaryConfig.cloud_name,
            api_key: CloudinaryConfig.api_key,
            api_secret: CloudinaryConfig.api_secret,
        })
    }

    fileUpload = async(filePath, folder= '') =>{
        try{
            // fileupload
            const result = await cloudinary.uploader.upload(filePath, {
                folder: "mern-35/"+folder,
                unique_filename: true,
                resource_type: "auto",
            })

            // delete the original file from server
            fs.unlinkSync(filePath);

            // optimize url
            const optimized_url = cloudinary.url(result.public_id,{
                quality: "80"
            })

            return {
                public_url: result.secure_url,
                optimized_url: optimized_url,
            }

        }catch(exception){
            // console.log(exception);
            throw{
                code: 500,
                message: "File upload error in Cloudinary",
                status: "CLOUDIBARY_SERVER_ERROR",
                detail: exception,
            }
        }
    }
}

const fileUploadSvc = new FileUploadService();


module.exports = fileUploadSvc;