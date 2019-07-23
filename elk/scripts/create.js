const envs = require('dotenv').config().parsed;
const { Client } = require('@elastic/elasticsearch');
const uuid = require('uuid');
const packets = require('../../seed/packets');
const client = new Client({ node: envs.ES_HOST });

async function putMapping () {
  console.log("Creating Mapping index");
  client.indices.putMapping({
      index: envs.ES_INDEX,
      body: {
        properties: { 
          'timestamp': {
            'type': 'long',
            'copy_to': 'datetime'
          },
          'datetime': {
            'type': 'date',
            'store': true
          },
          'location': {
            'type': 'geo_point'
          },
          t: {
            type: 'half_float'
          },
          p: {
            type: 'half_float'
          },
          o: {
            type: 'half_float'
          },
        }
      }
  }, (err,resp, status) => {
      if (err) {
        console.error(err, status);
      }
      else {
          console.log('Successfully Created Index', status, resp);
      }
  });
}

async function run () {
  await client.indices.create({ index: envs.ES_INDEX });
  console.warn('create index');
  await putMapping();

/*   packets.forEach(async (item) => {
    await client.create({
      index:  envs.ES_INDEX,
      id: uuid(),
      body: {
        ...item,
        location: '39.09972,-94.57853',
        datetime: new Date
      },
      refresh: 'wait_for',
    });
  });
  console.warn('create docs') */
  await client.indices.refresh({ index: envs.ES_INDEX, expand_wildcards: 'all' });
  console.warn('refresh index')
  const count = await client.search({
    index: envs.ES_INDEX,
    body: {
      query: {
        match_all: {}
      }
    }
  });
  console.warn('docs', count.body.hits.hits);
}

run().catch(console.log);