import { promises as fs } from 'fs';
import { Configuration, OpenAIApi } from 'openai';
import { Buffer } from 'buffer';

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const config = {
  api: {
    bodyParser:{
      sizeLimit: '25mb'
    }
  },
  runtime: 'edge'
}

export default async function handler(req) {
  const data = await req.formData();
  const file = data.get('file');

  const formData = new FormData();

  formData.append('model', 'whisper-1');
  formData.append('file', new Blob([file]));
  formData.append('response_format', 'json');

  try {
    const completion = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      body: formData,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Organization': process.env.OPENAI_ORGANIZATION
      }
    });
    const data = await completion.json();
    console.log('data', data)
    return new Response(JSON.stringify({}), {
      status: 200
    })
  } catch(e) {
    console.log('e', e)
    return new Response(JSON.stringify({}), {
      status: 500
    })
  }
}
