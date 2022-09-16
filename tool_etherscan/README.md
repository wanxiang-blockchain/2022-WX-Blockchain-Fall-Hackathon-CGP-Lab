# 以太坊区块扫描器

连接 etherscan.io 的api

```bash
#*Api-Key Token*
XXXXXXXXXXXXXXX

#查询余额
#Get Ether Balance for a single Address
https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=YourApiKeyToken

#查询接收方的所有订单(可限定查询的区块范围)
http://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken

http://api.etherscan.io/api?module=account&action=txlist&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&startblock=5000000&endblock=99999999&sort=asc&apikey=YourApiKeyToken


### ERC20 Token:  在ETH公链上
#指定接收方
http://api.etherscan.io/api?module=account&action=tokentx&address=0x5416f85b40342B751830C03486843A1E2f8F774c&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken

#指定Token合约地址
https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=0x4e83362442b8d1bec281594cea3050c8eb01311c&page=1&offset=100&sort=asc&apikey=YourApiKeyToken

#指定接收方和Token合约地址
https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=0x4e83362442b8d1bec281594cea3050c8eb01311c&page=1&offset=100&sort=asc&apikey=YourApiKeyToken

```
