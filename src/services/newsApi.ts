import { NEWS_API } from '@/config/api';

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export const fetchTopHeadlines = async (
  country: string = 'us',
  category?: string,
  page: number = 1
): Promise<NewsResponse> => {
  const params = new URLSearchParams({
    apiKey: NEWS_API.KEY,
    country,
    page: page.toString(),
    pageSize: '12',
  });

  if (category && category !== 'general') {
    params.append('category', category);
  }

  const response = await fetch(`${NEWS_API.ENDPOINTS.TOP_HEADLINES}?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  return response.json();
};

export const searchNews = async (
  query: string,
  language: string = 'en',
  page: number = 1
): Promise<NewsResponse> => {
  const params = new URLSearchParams({
    apiKey: NEWS_API.KEY,
    q: query,
    language,
    page: page.toString(),
    pageSize: '12',
    sortBy: 'publishedAt',
  });

  const response = await fetch(`${NEWS_API.ENDPOINTS.EVERYTHING}?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to search news');
  }

  return response.json();
};
