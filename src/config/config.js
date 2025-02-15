require('dotenv').config(); 
const CloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}

const SMTPConfig = {
    provider: process.env.SMTP_PROVIDER,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    username: process.env.SMTP_USER,    
    password: process.env.SMTP_PASSWORD,
    from : process.env.SMTP_FROM_ADDRESS,
}

const appConfig = {
    frontend_url: process.env.FRONTEND_URL,
    jwt_secret: process.env.JWT_SECRET
}

const dbConfig = {
    mongo: {
        url: process.env.MONGODB_URL,
        dbName: process.env.MONGODB_NAME,
    }
}

module.exports = {
    CloudinaryConfig,
    SMTPConfig,
    appConfig,
    dbConfig
}   


