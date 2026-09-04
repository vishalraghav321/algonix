import axios from 'axios';

export const getJudge0LanguageId = (Language) => {
  const LanguageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };

  return LanguageMap[Language.toUpperCase()];
};

const judge0 = axios.create({
  baseURL: process.env.JUDGE0_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.RAPIDAPI_HOST,
  },
});

export const submitBatch = async (submissions) => {
  const { data } = await judge0.post(
    `/submissions/batch?base64_encoded=false`,
    { submissions },
  );

  return data;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await judge0.get(
      `/submissions/batch`,
      {
        params: {
          tokens: tokens.join(','),
          base64_encoded: false,
        },
        
      },
    );

    const results = data.submissions;

    const isAlldone = results.every(
      (r) => r.status.id !== 1 && r.status.id !== 2,
    );

    if (isAlldone) return results;
    await sleep(1000);
  }
};

export function getLanguageName(LanguageId) {
  const LANGUAGE_NAMES = {
    74: 'TypeScript',
    63: 'JavaScript',
    71: 'Python',
    62: 'Java',
  };

  return LANGUAGE_NAMES[LanguageId] || 'Unknown';
}
