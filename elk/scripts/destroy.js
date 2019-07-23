const envs = require('dotenv').config().parsed;
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: envs.ES_HOST });

async function run () {
  await client.indices.delete({
    index: envs.ES_INDEX
  });
}

run().catch(console.log);