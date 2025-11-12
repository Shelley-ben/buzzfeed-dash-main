const API_KEY = '53a4b864558e4e7ebb5872d217c7ecf9';
const BASE_URL = 'https://newsapi.org/v2';

export const NEWS_API = {
  KEY: API_KEY,
  BASE_URL,
  ENDPOINTS: {
    TOP_HEADLINES: `${BASE_URL}/top-headlines`,
    EVERYTHING: `${BASE_URL}/everything`,
  },
};

export const CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'sports', label: 'Sports' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
];

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
];
