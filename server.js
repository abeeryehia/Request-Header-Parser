var express = require("express");
//var os = require("os");
var app = express();
var userIp,userLang,userSW;
var inofObj = {
    "ipaddress":userIp,
    "language": userLang,
    "software": userSW
};
app.set('port', (process.env.PORT || 5000))
app.get('/',function(req,res){
    userIp = req.headers['x-forwarded-for']||req.connection.remoteAddress;;
    userLang = req.headers["accept-language"];
    var ua = req.headers['user-agent'];
    var from = ua.indexOf('(')+1;
    var to = ua.indexOf(')');
    userSW = ua.substr(from,to-from);
    inofObj.ipaddress = userIp;
    inofObj.language = userLang;
    inofObj.software= userSW;
    res.send(inofObj);
});

app.listen(app.get('port'));
