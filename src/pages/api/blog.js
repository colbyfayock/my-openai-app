import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const shape = {
  content: 'Blog content'
}

export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body)

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Create a blog post with the following topic: ${prompt}. Format the response as a JSON object with a shape of ${JSON.stringify(shape)}.`
      }
    ]
  });

  const content = JSON.parse(completion.data.choices[0].message.content);

  res.status(200).json({
    data: content
  })
}
