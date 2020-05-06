const multer = require('multer');

const MIME_TYPE = {
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
};
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
   const isValid = MIME_TYPE[file.mimetype];
    let error= new Error("Invalid");
    if(isValid)
    {
      error = null;
    }
   cb(error,"backend/images");
      //  cb(error,"images");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE[file.mimetype];
    cb(null,name+'-'+Date.now()+'.'+ext);
  }
});

const upload = multer({storage:storage});
module.exports = upload;
