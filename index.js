const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(3000, '127.0.0.1', function() {
    server.close(function() {
        server.listen(3000, '127.0.0.1')
    })
});