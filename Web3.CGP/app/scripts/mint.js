let express = require('express');

let router = express.Router();

// /mint
router.post('/', async function(req, res, next) {
  // console.log(req.body)
  console.log(req.files) //支持多个文件,是个数组

  //TODO:铸造nft

  res.send({
    code: 100, //error: 0
    data: req.files,
    msg: '铸造成功'
  })

});


module.exports = router;
