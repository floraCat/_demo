var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 3003});
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
        ws.send("Server sended: received " + message);
    });
    ws.send("Server sended: I'm Server");
});