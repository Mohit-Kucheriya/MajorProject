const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:"dcooeoplr",
    api_key:"628111615431858",
    api_secret:"dPGx1x7NHbX00Wt9XG8DjsnMPCU"
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wanderlust_DEV',
        allowedFormats:["png", "jpg", "jpeg"], 
    },
});

module.exports = { cloudinary, storage }