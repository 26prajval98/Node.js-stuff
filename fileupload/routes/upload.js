var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var multer = require('multer'); 
var path = require('path');

var authenticate = require('../authenticate');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
    destination :(req, file, cb)=>{
        cb(null,'public/images');
    }, 
    filename:  (req,file, cb)=>{
        cb(null, file.originalname);
    }
})

var imageFileFilter = (req, file, cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG)$/)){
        return cb(new Error('Only Image file'), false);
    }
    return cb(null, true);
};

var upload =    multer({storage: storage, fileFilter: imageFileFilter});

router.post('/', upload.single('imageFIle'), (req, res, next)=>{
    res.statusCode =200;
    res.setHeader('Content-type', 'application/json');
    res.json({file: req.file});
})

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../public/images', 'A1.PNG'))
})


module.exports = router;