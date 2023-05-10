require('dotenv').config({
  path: './.env.local'
});

const fs = require('fs').promises;
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

const characters = require('../src/data/characters.json');

(async function run() {
  try {
    const allPrompts = [];
    for ( const character of characters ) {
      const prompts = await generatePrompts(character);
      allPrompts.push(prompts);
      await fs.writeFile('./src/data/prompts.jsonl', allPrompts.join('\n'))
    }
  } catch(e) {
    console.log('e', e.message);
  }
})();

async function generatePrompts(character) {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `
          You are an assistant that generates JSONL prompts based off of JSON data for fine tuning.
          Each response should be formatted as:
          ${JSON.stringify({
            prompt: `What species is ${characters[0].name}?`,
            completion: characters[0].species
          })}
          Please generate 10 questions based off of the JSON and provide it in JSONL format.
          Each response should come from the following JSON:
          ${JSON.stringify(character)}
        `
      },
    ]
  });

  const prompts = completion.data.choices[0].message.content;

  return prompts.split('\n').map(prompt => {
    try {
      JSON.parse(prompt);
      return prompt.trim()
    } catch(e) {
      console.log('Bad Data', prompt)
      return false;
    }
  }).filter(prompt => !!prompt).join('\n');
}