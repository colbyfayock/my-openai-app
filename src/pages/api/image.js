import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const response = await openai.listEngines();
  res.status(200).json({ data: response.data.data })
}
