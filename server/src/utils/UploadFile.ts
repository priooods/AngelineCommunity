import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'../server/src/assets')
    },
    filename: (req:any, file, cb) => {
        cb(null,req.payload.id + "_" + file.originalname)
    }
})
const uploades = multer({ storage: storage });
export default uploades;