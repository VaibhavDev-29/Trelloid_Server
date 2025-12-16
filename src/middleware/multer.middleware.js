import multer from "multer"




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

console.log("h");


const upload = multer({ 
    storage,
    limits: {
    fileSize: 1 * 1000 * 1000,
  },
 })


 export {
    upload
 }