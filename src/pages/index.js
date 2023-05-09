import { useState } from 'react';
import Head from 'next/head'

import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Form from '@/components/Form';
import FormRow from '@/components/FormRow';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';

import styles from '@/styles/Home.module.scss'

function getFieldFromFormByName({ name, form } = {}) {
  const fields = Array.from(form?.elements);
  return fields.find(el => el?.name === name);
}

export default function Home() {
  const [audioSrc, setAudioSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [transcription, setTranscription] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setAudioSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnTranscribe(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    setIsLoading(true);
    setTranscription(undefined);

    const formData = new FormData();

    for ( const file of fileInput.files ) {
      formData.append('file', file);
    }

    const { data } = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    }).then(r => r.json());
console.log('data', data);

    // setTranscription(data);
    setIsLoading(false);
  }

  return (
    <Layout>
      <Head>
        <title>Image Generator</title>
        <meta name="description" content="Generate an image!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container size="content">
          <Form className={styles.form} onSubmit={handleOnTranscribe} onChange={handleOnChange}>
            <h2>Transcribe</h2>
            <FormRow>
              <label>Select Your Audio File:</label>
              <input type="file" name="file" />
            </FormRow>
            <FormRow>
              <Button disabled={isLoading}>Upload</Button>
            </FormRow>
          </Form>
        </Container>
      </Section>
    </Layout>
  )
}