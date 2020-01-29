var rabbitConfig = {
    connection: {
      name: "rabbitmqcon",
      user: "guest",
      pass: "guest",
      server: "192.168.99.100",
      vhost: "/",
      port: "5672",
      heartbeat: 20,
      replyQueue: false,
    },
    exchanges: [
      {
        name: "chat_request_exchange",
        type: "fanout",
        durable: true,
      },
      {
        name: "chat_response_exchange",
        type: "fanout",
        durable: true,
      }
    ]
  };
  
  module.exports = rabbitConfig