var nodeMailer = require('nodemailer');
var SMTP = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'the.boy.who.live.70@gmail.com',
        pass: 'afsmzrholbvjhoyx'
    }
};
var transporter = nodeMailer.createTransport(SMTP);

exports.SendMail = function(to, subject, body, callback) {
    var mailoptions = {
        from: '"Pulse Market"',
        to: to,
        subject: subject,
        html: body
    };

    transporter.sendMail(mailoptions, callback);
};


