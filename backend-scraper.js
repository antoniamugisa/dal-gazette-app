// Backend scraper service for Dal Gazette
// Run this with: node backend-scraper.js

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for your React Native app
app.use(cors());
app.use(express.json());

const DAL_GAZETTE_BASE_URL = 'https://dalgazette.com';

// Scrape the main page for articles
async function scrapeDalGazette() {
  try {
    console.log('🔍 Scraping Dal Gazette website...');
    
    const response = await axios.get(DAL_GAZETTE_BASE_URL, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const articles = [];

    // Try multiple selectors to find articles
    const articleSelectors = [
      'article',
      '.post',
      '.article',
      '.entry',
      '[class*="article"]',
      '[class*="post"]'
    ];

    let foundArticles = false;

    for (const selector of articleSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        console.log(`✅ Found ${elements.length} articles with selector: ${selector}`);
        foundArticles = true;

        elements.each((index, element) => {
          if (index >= 10) return; // Limit to 10 articles

          const $el = $(element);
          
          // Extract article data
          const title = $el.find('h1, h2, h3, .title, [class*="title"]').first().text().trim();
          const link = $el.find('a').first().attr('href');
          const excerpt = $el.find('p, .excerpt, [class*="excerpt"]').first().text().trim();
          const image = $el.find('img').first().attr('src');
          const date = $el.find('time, .date, [class*="date"]').first().text().trim();

          if (title && title.length > 10) {
            articles.push({
              id: `scraped-${index + 1}`,
              title: title,
              excerpt: excerpt || title.substring(0, 150) + '...',
              content: '', // Will be filled when article is opened
              category: 'News', // Default category
              author: 'Dal Gazette Staff', // Default author
              publishedAt: new Date(),
              imageUrl: image ? (image.startsWith('http') ? image : `${DAL_GAZETTE_BASE_URL}${image}`) : undefined,
              tags: [],
              url: link ? (link.startsWith('http') ? link : `${DAL_GAZETTE_BASE_URL}${link}`) : undefined
            });
          }
        });
        break;
      }
    }

    if (!foundArticles) {
      console.log('⚠️ No articles found with standard selectors, trying alternative approach...');
      
      // Try to find any links that might be articles
      $('a').each((index, element) => {
        if (index >= 10) return;
        
        const $link = $(element);
        const href = $link.attr('href');
        const text = $link.text().trim();
        
        if (href && text && text.length > 20 && !href.includes('#') && !href.includes('mailto:')) {
          articles.push({
            id: `scraped-${index + 1}`,
            title: text,
            excerpt: text.substring(0, 150) + '...',
            content: '',
            category: 'News',
            author: 'Dal Gazette Staff',
            publishedAt: new Date(),
            imageUrl: undefined,
            tags: [],
            url: href.startsWith('http') ? href : `${DAL_GAZETTE_BASE_URL}${href}`
          });
        }
      });
    }

    console.log(`✅ Successfully scraped ${articles.length} articles`);
    return articles;

  } catch (error) {
    console.error('❌ Error scraping Dal Gazette:', error.message);
    return [];
  }
}

// Scrape individual article content
async function scrapeArticleContent(articleUrl) {
  try {
    console.log(`🔍 Scraping article content: ${articleUrl}`);
    
    const response = await axios.get(articleUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    
    // Try multiple selectors for article content
    const contentSelectors = [
      '.entry-content',
      '.post-content',
      '.article-content',
      '.content',
      'article p',
      'main p'
    ];

    let content = '';
    for (const selector of contentSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        content = elements.map((i, el) => $(el).text().trim()).get().join('\n\n');
        if (content.length > 100) break;
      }
    }

    return content || 'Content could not be extracted from this article.';

  } catch (error) {
    console.error('❌ Error scraping article content:', error.message);
    return 'Error loading article content.';
  }
}

// API Routes
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await scrapeDalGazette();
    res.json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/article-content', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, error: 'URL is required' });
    }
    
    const content = await scrapeArticleContent(url);
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Dal Gazette Scraper API running on http://localhost:${PORT}`);
  console.log(`📱 Your React Native app should connect to: http://localhost:${PORT}/api/articles`);
});
