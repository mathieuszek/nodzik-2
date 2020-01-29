const mailSchema = require('../schemas/mail')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const amqp = require('amqplib/callback_api')

// // GET
exports.index = (req, res) => {
    res.send('Hello there')
}

// // POST
// send email
exports.send = async (req, res) => {
    const mail = {
        to: req.body.to,
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.text
    }
    if (mailSchema.validate(mail) > 0) {
        return res.status(400).send("Bad request")
    }
    try {
        // send email to somebody
        //await sgMail.send(mail) 
        // connect to rabbitmq
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1
                }
                var exchange = 'januszauction.email.service.messages.events'
                var args = process.argv.slice(2)
                var key = (args.length > 0) ? args[0] : 'send.info'
                var msg = args.slice(1).join(' ') || `OK ${mail.to}`
                channel.assertExchange(exchange, 'topic', {
                    durable: true,
                    autoDelete: true
                })
                channel.publish(exchange, key, Buffer.from(msg))
                console.log(" [x] Sent %s:'%s'", key, msg)
                // var exchange = 'logs';
                // var msg = process.argv.slice(2).join(' ') || `sent to: ${mail.to}`;

                // channel.assertExchange(exchange, 'fanout', {
                //     durable: true
                // });
                // channel.publish(exchange, '', Buffer.from(msg));
                console.log(" [x] Sent %s", msg)
            })
        })
        return res.status(200).send("Sent successfully")
    } catch (err) {
        return res.status(401).send("Sendgrid error")
    }
}