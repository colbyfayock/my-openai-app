require('dotenv').config({
  path: './.env.local'
});

const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

(async function run() {
  const response = await openai.createFile(
    fs.createReadStream('./src/data/prompts.jsonl'),
    'fine-tune'
  );
  console.log('response', response.data); // file-90ymlkX8B1mLcFFNsdOaDogc
})();