import { Article } from '../types';

// Real web scraping using backend API
const API_BASE_URL = 'http://localhost:3001/api';

export const scrapeDalGazette = async (): Promise<Article[]> => {
  try {
    console.log('🔍 Fetching real articles from Dal Gazette...');
    
    const response = await fetch(`${API_BASE_URL}/articles`);
    const data = await response.json();
    
    if (data.success && data.articles) {
      console.log(`✅ Successfully fetched ${data.articles.length} real articles`);
      return data.articles;
    } else {
      console.log('⚠️ API returned no articles, using fallback');
      return getFallbackArticles();
    }
  } catch (error) {
    console.error('❌ Error fetching real articles:', error);
    console.log('📱 Make sure the backend scraper is running on http://localhost:3001');
    return getFallbackArticles();
  }
};

export const scrapeArticleContent = async (url: string): Promise<string> => {
  try {
    console.log(`🔍 Fetching article content: ${url}`);
    
    const response = await fetch(`${API_BASE_URL}/article-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    
    const data = await response.json();
    
    if (data.success && data.content) {
      console.log('✅ Successfully fetched article content');
      return data.content;
    } else {
      console.log('⚠️ API returned no content, using fallback');
      return getMockArticleContent(url);
    }
  } catch (error) {
    console.error('❌ Error fetching article content:', error);
    return getMockArticleContent(url);
  }
};

// Fallback articles when API is not available
const getFallbackArticles = (): Article[] => {
  return [
    {
      id: 'fallback-1',
      title: 'Dal Gazette - Real Articles Coming Soon',
      excerpt: 'This is a fallback article. Make sure the backend scraper is running to get real articles.',
      content: 'This is a fallback article. The backend scraper service needs to be running to fetch real articles from the Dal Gazette website. Please start the backend service and try again.',
      category: 'News',
      author: 'Dal Gazette Staff',
      publishedAt: new Date(),
      imageUrl: undefined,
      tags: ['dalhousie', 'university', 'news'],
      url: 'https://dalgazette.com'
    },
    {
      id: 'fallback-2',
      title: 'Backend Service Required',
      excerpt: 'To get real articles, start the backend scraper service.',
      content: 'This is a fallback article. The backend scraper service needs to be running to fetch real articles from the Dal Gazette website. Please start the backend service and try again.',
      category: 'News',
      author: 'Dal Gazette Staff',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      imageUrl: undefined,
      tags: ['campus', 'student', 'activities'],
      url: 'https://dalgazette.com'
    },
    {
      id: 'fallback-3',
      title: 'Real-Time Content Available',
      excerpt: 'Connect to the backend API to get live Dal Gazette articles.',
      content: 'This is a fallback article. The backend scraper service needs to be running to fetch real articles from the Dal Gazette website. Please start the backend service and try again.',
      category: 'Sports',
      author: 'Dal Gazette Staff',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      imageUrl: undefined,
      tags: ['sports', 'tigers', 'athletics'],
      url: 'https://dalgazette.com'
    }
  ];
};

// Mock content for individual articles when API fails
const getMockArticleContent = (url: string): string => {
  return `This is mock content for the article at ${url}. The backend scraper service needs to be running to fetch real article content from the Dal Gazette website. Please start the backend service and try again.`;
};