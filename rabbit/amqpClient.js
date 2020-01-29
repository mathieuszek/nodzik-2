'use strict'

var open = require('amqplib').connect('amqp://localhost')

var q = 'tasks'

open.then((conn) => {
    return conn.createChannel();
  }).then((ch) => {
    return ch.assertQueue(q).then((ok) => {
      return ch.consume(q, (msg) => {
        if (msg !== null) {
          console.log(msg.content.toString());
          console.log(msg.content.abc.toString())
          ch.ack(msg);
        }
      });
    });
  }).catch(console.warn);
 
// Publisher
open.then((conn) => {
  return conn.createChannel();
}).then((ch) => {
  return ch.assertQueue(q).then((ok) => {
    return ch.sendToQueue(q, Buffer.from('something to do'));
  });
}).catch(console.warn);
 
// Consumer
open.then((conn) => {
  return conn.createChannel();
}).then((ch) => {
  return ch.assertQueue(q).then((ok) => {
    return ch.consume(q, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });
}).catch(console.warn);