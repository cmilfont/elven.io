const envs = require('dotenv').config().parsed;
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: envs.ES_HOST });

async function run () {

  await client.indices.refresh({ index: envs.ES_INDEX });
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