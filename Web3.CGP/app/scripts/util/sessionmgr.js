function DoLogon(req, myAddr, password) {
    req.session.un = myAddr;
    req.session.pw = password;
    req.session.islogon = true;
}

function IsLogon(req) {
    if (req.session.islogon==null)
        return false;

    return req.session.islogon;
}

function GetLogonAddr(req) {
    if(!IsLogon(req))
        return "";

    return req.session.un;
}

function GetLogonPwd(req){
    return req.session.pw;
}

module.exports = {
    DoLogon,
    GetLogonAddr,
    GetLogonPwd,
    IsLogon
};