var http = require('http');
var express = require('express');
var PORT = process.env.PORT || 8100
const path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function (req,res) {
    res.sendFile(__dirname+'/index.html');
});

app.post('/',function (req,res) {
    var smtpConfig = {
        service : 'Gmail',
        auth : {
            user : 'avdhut.kadam73@gmail.com',
            pass : 'AK@061105'
        },
    };
    var transport = nodemailer.createTransport(smtpConfig);

    var mailOptions = {
        from:"Krishna Agro<avdhut.kadam73@gmail.com>",
        to: 'kadamavdhut73@gmail.com',
        subject: req.body.subject,
        html:'<b>Hello Admin,</b> <p> You have a new message from customer throgh Krishnaagro.com. <br/> Message Details are as follows.</p> <b>Name &emsp; :</b>'+req.body.name+'<br/><b>Mob No &nbsp; :</b>'+req.body.mobno+'<br/><b>Message : </b>'+req.body.messagebody
    };
    transport.sendMail(mailOptions,function(error, info) {
        if (error) {
            console.log(error);
            res.send(error);
        }else{
            console.log('Message Sent:'+info.response);
            res.sendFile(__dirname+"/index.html");
        }
    })
})
app.listen(PORT,() =>console.log(`Listening at ${ PORT }`));