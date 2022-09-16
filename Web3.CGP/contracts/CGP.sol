// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CGP {
    address owner;

    event InitCredit(string, string);
    event VerifyProof(string, string);

    // 影响信誉值类型
    enum CredictTypes {Article, Team, Scientific, Evaluation}
    // 各信誉值影响因子
    string[4] credictFactors;

    // 用户信誉值, 信誉值已加密
    mapping(string => string) creditData;

    // 预编译合约
    // address heAddress = 0x92Fc16cDD7827d54E65790936814378Da1FEc03D;
    address heAddress = 0x0000000000000000000000000000000000000101;

    constructor(string[4] memory _factors) {
        owner = msg.sender;
        credictFactors = _factors;
    }

    modifier ownerOlny() {
        require(owner == msg.sender, "no access");
        _;
    }

    /** 按指定key查询影响因子
    * @param factorKey 查询key值
    * @return 影响因子值
    */
    function queryFactor(uint factorKey) public view returns (string memory) {
        return credictFactors[factorKey];
    }

    /** 更新指定key查询影响因子
    * @param factorKey 查询key值
    * @param factor 影响因子值
    */
    function updateFactor(uint factorKey, string memory factor) public ownerOlny {
        if (factorKey < credictFactors.length) {
            credictFactors[factorKey] = factor;
        }
    }

    /** 查询指定did的信誉值(密文)
    * @param did 用户的did
    * @return 信誉值密文
    */
    function queryCredit(string memory did) public view returns (string memory) {
        return creditData[did];
    }


    /** 初始化某一did信誉值，一般初始化为0
    * @param did 用户did
    * @param credit 用户信誉初始值
    */
    function initCredit(string memory did, string memory credit) public ownerOlny {
        creditData[did] = credit;
        emit InitCredit(did, credit);
    }

    /** 向某一用户添加信誉值
    * @param did 用户did
    * @param cipher 增加用户信誉值密文
    * @param pubKey 同态计算的公钥
    * @param _type 信誉值增加的类别
    */
    function addCredit(string memory did, string memory cipher, string memory pubKey, CredictTypes _type) public returns (string memory, int) {
        require(bytes(creditData[did]).length > 0, "did not init credit");
        string memory factor = credictFactors[uint(_type)];
        (bool _ok, bytes memory result) = heAddress.call(abi.encodeWithSignature("paillierMul(string,string,string)", cipher, factor, pubKey));
        if (_ok) {
            (string memory str, int res) = abi.decode(result, (string, int));
            (_ok, result) = heAddress.call(abi.encodeWithSignature("paillierAdd(string,string)", str, cipher));
            if (_ok) {
                (str, res) = abi.decode(result, (string, int));
                return (str, res);
            }
        }
        return ("error", 10);
    }

    /** 验证权威机构开具的零知识证明
    */
    function verifyProof(string memory proof, string memory pid) public returns (bool) {
        emit VerifyProof(proof, pid);
        return false;
    }
}
