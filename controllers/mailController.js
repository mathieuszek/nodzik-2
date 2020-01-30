const nodemailer = require('nodemailer');
const mailSchema = require('../schemas/mail.js');
const serverConfig = {
    service: 'gmail',
    //host: 'smtp.gmail.com',
    port: 25,
    //secure: false,
    auth: {
      user: 'mailsender1994@gmail.com',
      pass: 'Malaka1@3#2!'
    }
};

exports.index = async (req, res) => {
    return res.send("Yo, nigga!");
}

exports.send = async (req, res) => {
    const mail = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };
    if (mailSchema.validate(mail) > 0) {
        return res.status(400).send("Invalid email!");
    }
    let transporter = nodemailer.createTransport(serverConfig);

    let sendResult = null
    try {
        sendResult = await transporter.sendMail(mail);
        console.log(sendResult);
    } catch(err) {
        console.error(err);
    }
    console.info(sendResult);
    console.info(typeof sendResult);
    return res.send(sendResult);
}