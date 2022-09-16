# 2022-WX-Blockchain-Fall-Hackathon-CGP-Lab

## 目录说明

```bash
.
└── py-etherscan-api    # 以太坊区块扫描器(连接 etherscan.io 的api)
```

## 前端密文计算SDK的用法

### **使用**

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
