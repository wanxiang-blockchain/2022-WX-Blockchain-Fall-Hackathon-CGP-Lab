# 2022-WX-Blockchain-Fall-Hackathon-CGP-Lab

## 目录说明

```bash
.
├── cgp               # 前端,生成同态密文的公私钥与加解密
├── py-etherscan-api  # 以太坊区块扫描器(连接 etherscan.io 的api)
└── Web3.CGP          # 后端服务,其中的NFT铸造中间件用到了ipfs的nft.storage
```

## cgp - 前端密文计算的用法

```js
// 引用库
import { HeManager } from 'he-manager-js';

const HeManager = new HeManager();

// 生成公私钥
// 256是生成公私钥的长度
heManager.heCreateKeys(256).then(keys => {
      console.log("pubkey:", keys.pubkey)
      console.log("seckey:", keys.seckey)
    });

// 加密函数
// plain: 需要加密的数字，字符串
// pubkey: 公钥
heManager.heEncryption(plain, pubkey).then(cipher => {
      console.log(cipher)
    });

// 解密函数
// cipher: 密文
// seckey: 私钥
// pubkey: 公钥
heManager.heDecryption(cipher, seckey, pubkey).then(plain => {
      console.log(plain)
    })
```

## Web3.CGP - CGP的后端服务

### NFT铸造中间件

这是一个 上传NFT元数据 并 铸造NFT 的中间件

#### 在NFT.Storage上上传nft的元数据文件
`Web3.CGP/app/scripts/upload.js`

```js
function MakeStorageClient() {
  // console.log(GetAccessToken() )
  return new NFTStorage.NFTStorage({ token: GetAccessToken() });
}

async function StoreContent(image, name, description) {
  console.log("Uploading files to IPFS with nft.storage....");
  const client = MakeStorageClient();
  const result = await client.store({
    image,
    name,
    description,
  });
  console.log("Stored files with result:", result);
  return result;
}
```

![image-20220916215557576](res/image-20220916215557576.png)

#### 在链上铸造NFT
`Web3.CGP/app/scripts/main.js`

```bash
curl -F 'file=@/mnt/d/Downloads/newnew/icon.jpg' http://127.0.0.1:17171/mint  

{"code":100,"msg":"铸造成功"}
```