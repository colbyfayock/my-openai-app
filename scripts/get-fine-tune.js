require('dotenv').config({
  path: './.env.local'
});

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

(async function run() {
  const response = await openai.retrieveFineTune('ft-E8W4YYgBs50Bf4D7s8F6qp75');
  console.log('response', response.data); // davinci:ft-personal-2023-05-10-16-59-59
})();