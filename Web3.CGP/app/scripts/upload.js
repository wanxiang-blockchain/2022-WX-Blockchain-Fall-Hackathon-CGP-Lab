let express = require('express');
var fs = require('fs');
var mime = require('mime');
let NFTStorage = require('nft.storage');

const multer = require('multer')
const upload = multer({
  dest: './app/upload'
})

let router = express.Router();
let nftstorage = require('./util/StoreContent');

router.use(upload.any())

async function fileFromPath(filePath) {
  console.log(filePath)
  const content = await fs.promises.readFile(filePath);
  const type = mime.mime.getType(filePath);
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
  
  const uploadMeta = async () => {
    try {
      image = await fileFromPath(req.files[0].path);

      const cid = await nftstorage.StoreContent(
        {
          image,
          name,
          description,
        });
      console.log(cid);

      const URL = `https://ipfs.io/ipfs/${cid}`; //这是一个文件夹名
      console.log(URL);
      console.log("File uploaded to IPFS succ !!!");

      req.files.push({cid: cid})
      req.files.push({url: URL})
      
      // setIpfsUrl(URL);
    } catch (err) {
      console.log(err);
    }
  };
  await uploadMeta()

  res.send({
    code: 100, //error: 0
    data: req.files,
    msg: '上传成功'
  })

});


module.exports = router;
