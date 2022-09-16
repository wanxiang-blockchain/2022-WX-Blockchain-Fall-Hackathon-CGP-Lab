let express = require('express');
var fs = require('fs');
var mime = require('mime');
let NFTStorage = require('nft.storage');

const multer = require('multer')
const path = require('path')
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, './app/upload')
}, 
   //给上传文件重命名，获取添加后缀名
   filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});  
const upload = multer({
  // dest: './app/upload',
  storage: storage
})

let router = express.Router();
let nftstorage = require('./util/StoreContent');

router.use(upload.any())

async function fileFromPath(filePath) {
  // console.log(filePath)
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  console.log(type)

  return new NFTStorage.File([content], path.basename(filePath), { type });
}

// /upload
router.post('/', async function(req, res, next) {
  // console.log(req.body)
  console.log(req.files) //支持多个文件,是个数组

  if (req.files.length<1){
    console.log("fail, req.files.length");
    res.send({
      code: 0, //error: 0
      data: req.files,
      msg: 'fail'
    })
  }
  
  imgFile = req.files[0]
  const uploadMeta = async () => {
    try {
      image = await fileFromPath(imgFile.path);

      const result = await nftstorage.StoreContent(image, imgFile.originalname, imgFile.filename);
      // console.log(result);

      const URL = `https://ipfs.io/ipfs/${result.ipnft}`; //这是一个文件夹名
      console.log(URL);
      console.log("nft metadata uploaded to IPFS succ !!!");

      req.files.push({result: result})
      req.files.push({url: URL})
      
      // setIpfsUrl(URL);
    } catch (err) {
      console.log(err);
    }
  };
  await uploadMeta()

  //TODO:铸造nft

  res.send({
    code: 100, //error: 0
    data: req.files,
    msg: '铸造成功'
  })

});


module.exports = router;
