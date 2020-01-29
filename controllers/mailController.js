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
    // send email to somebody
    //await sgMail.send(mail) 
    // connect to rabbitmq
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var exchange = 'januszauction.email.service.messages.events';
            var args = process.argv.slice(2);
            console.log(process.argv)
            var key = (args.length > 0) ? args[0] : 'sent.info';
            console.log(key)
            var msg = args.slice(1).join(' ') || `OK ${mail.to}`;
            console.log(msg)
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
            console.log(" [x] Sent %s", msg);
            
        });
    });
    // let connection = await amqp.connect('amqp://localhost')
    // let channel = await connection.createChannel()
    // let exchange = 'logs'
    // let msg = process.argv.slice(2).join(' ') || 'Hello World!'

    // channel.assertExchange(exchange, 'fanout', {
    //     durable: false
    // })

    // // publish to rabbitmq
    // channel.publish(exchange, '', Buffer.from(msg))
    // console.log(" [x] Sent %s", msg)
    // setTimeout(function () {
    //     connection.close()
    //     process.exit(0)
    // }, 500)
    return res.status(200).send("Sended successfully")
    // } catch (err) {
    //     return res.status(401).send("Sendgrid error")
    // }

}