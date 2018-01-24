const { RequireAll } = require('patron.js');
const { join } = require('path');
const client = require('./structures/Client.js');
const registry = require('./structures/Registry.js');
const http = require('http');
const express = require('express');
const app = express();
const rebirth = require('rebirth');

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.registry = registry;
RequireAll(join(__dirname, 'events'));
RequireAll(join(__dirname, 'intervals'));

client.db.init(process.env.MONGOCONNECTIONURL);
client.init();

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:\n' + err.stack);
});

process.on('SIGPIPE', err => {
  rebirth();
});