const envs = require('dotenv').config().parsed;
const { Client } = require('@elastic/elasticsearch');
const uuid = require('uuid');
const client = new Client({ node: envs.ES_HOST });

function insert(item) {
  client.create({
    index:  envs.ES_INDEX,
    id: uuid(),
    body: {
      ...item,
      location: envs.ES_LOCATION,
      datetime: new Date
    },
    refresh: 'wait_for',
  }).catch(err => {
    console.log('Error on insert', err);
  });
}

//insert( {"i":"DC4F225F4282","t":"20.62","p":"6.98","o":"-24.42"} );

module.exports = insert;