const envs = require('dotenv').config().parsed;
const mqtt = require('mqtt');
const elastic = require('./elk');

const client = mqtt.connect( envs.MQTT_HOST, {
  username: envs.MQTT_USERNAME,
  password: envs.MQTT_PASSWORD,
});

client.on('error', function (err) {
  console.log('Erro', err)
  client.end()
});

client.on('connect', function () {
  client.subscribe(envs.MQTT_TOPIC, function (err, params) {
    if (err) {
      console.log('Poor state update to %s', err);
      client.end();
    }
    console.log('subscribed', params);
  })
});

client.on('message', function (topic, message) {
  // message is Buffer
  const json = JSON.parse(message.toString());
  elastic(json);
  console.log('inserted', json);
  //client.end()
});