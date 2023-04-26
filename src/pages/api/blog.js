import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const shape = {
  title: 'Technology title',
  content: '<p>A blog post about current technology</p>'
}

export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body)

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
          You are an assistant that creates new blog posts on a given topic.
          You should provide a title and HTML content in JSON format.
        `
      },
      {
        role: 'user',
        content: 'technology'
      },
      {
        role: 'assistant',
        content: JSON.stringify(shape)
      },
      {
        role: 'user',
        content: `Create a blog post with the following topic: ${prompt}.`
      }
    ]
  });

  const content = JSON.parse(completion.data.choices[0].message.content);

  res.status(200).json({
    data: content
  })
}
