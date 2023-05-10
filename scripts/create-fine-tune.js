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
  const response = await openai.createFineTune({
    training_file: 'file-90ymlkX8B1mLcFFNsdOaDogc',
    model: 'davinci'
  });
  console.log('response', response.data); // ft-E8W4YYgBs50Bf4D7s8F6qp75
})();