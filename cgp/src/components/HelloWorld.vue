<template>
  <div class="hello">
    <h1>{{ key }}</h1>
    <div>
      <el-select v-model="key" placeholder="请选择" value-key="id">
        <el-option
          v-for="item in keys"
          :key="item.id"
          :label="item.name"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button @click="genKey">生成公私钥</el-button>
    </div>
    <div class="margin-s">
      <el-input
        style="width:600px;"
        v-model="plain"
        placeholder="请输入内容"
        clearable
      ></el-input>
      <el-button @click="encrypt">加密</el-button>
    </div>
    <div class="margin-s">
      <el-input
        style="width:600px;"
        v-model="cipher"
        placeholder="请输入内容"
        clearable
      ></el-input>
      <el-button @click="decrypte">解密</el-button>
    </div>
  </div>
</template>

<script>
import { HeManager } from "he-manager-js";

export default {
  name: "HelloWorld",
  data() {
    return {
      keys: [
        {
          id: 1,
          name: "li",
          pubKey:
            "8e54b8d880584f821601b2801483552001da45485f8195dd3ce42b056fb2239f",
          secKey:
            "e3bac15a66f3b269bccf840020d221ca6c9cc13cf17d1fe2bdfef22dcc83cdc"
        },
        {
          id: 2,
          name: "zhang",
          pubKey:
            "e02146736dc72a18951c6e1504688078d7107a9d0923aa676bc903c8a43ea313",
          secKey:
            "47b8ba626091a7121b3c4c2faf7d99bfab4fbff91fa7472966cd09fae10b770"
        },
        {
          id: 3,
          name: "wang",
          pubKey:
            "a9f9c539086f3b3da901d4bd1b47dde4f406ea7f50f284b0660ba4eae751f8a7",
          secKey:
            "54fce29c84379d9ed480ea5e8da3eef1a5a6f706ddfb42a7af4363002addae38"
        }
      ],
      heManager: new HeManager(),
      msg: "Welcome to CGP Lab",
      plain: "",
      key: {},
      cipher: ""
    };
  },
  methods: {
    genKey() {
      this.heManager.heCreateKeys(256).then(keys => {
        console.log(keys);
        this.keys.push(keys);
      });
    },
    encrypt() {
      if (this.key.pubKey === undefined || this.plain.length < 1) {
        console.log("pubkey is undefined");
        return;
      }
      this.heManager.heEncryption(this.plain, this.key.pubKey).then(cipher => {
        console.log(cipher);
        this.cipher = "";
      });
    },
    decrypte() {
      if (this.key.pubKey === undefined || this.cipher.length < 5) {
        console.log("pubkey is undefined");
        return;
      }
      this.heManager
        .heDecryption(this.cipher, this.key.secKey, this.key.pubKey)
        .then(plain => {
          console.log(plain);
        })
        .catch(err => {
          this.$message.error("解密失败");
        });
    }
  }
};
</script>

<style scoped>
.margin-s {
  margin-top: 10px;
}
</style>
