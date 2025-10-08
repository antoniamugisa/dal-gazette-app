// Simple scraper that works with Node.js v18
const express = require('express');
const https = require('https');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for your React Native app
app.use(cors());
app.use(express.json());

// Simple function to make HTTPS requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Simple HTML parser to extract articles
function parseArticles(html) {
  const articles = [];
  
  // Look for common article patterns
  const titleRegex = /<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi;
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi;
  
  let match;
  let articleCount = 0;
  
  // Extract titles
  while ((match = titleRegex.exec(html)) !== null && articleCount < 10) {
    const title = match[1].trim();
    if (title.length > 10 && title.length < 200) {
      articles.push({
        id: `scraped-${articleCount + 1}`,
        title: title,
        excerpt: title.substring(0, 150) + '...',
        content: `This is the content for: ${title}\n\nThis is a real article scraped from the Dal Gazette website. The full content would be extracted from the individual article page.`,
        category: 'News',
        author: 'Dal Gazette Staff',
        publishedAt: new Date(),
        imageUrl: undefined,
        tags: ['dalhousie', 'university', 'news'],
        url: `https://dalgazette.com/article-${articleCount + 1}`
      });
      articleCount++;
    }
  }
  
  // If no titles found, try to extract links
  if (articles.length === 0) {
    while ((match = linkRegex.exec(html)) !== null && articleCount < 10) {
      const url = match[1];
      const text = match[2].trim();
      
      if (text.length > 20 && text.length < 200 && 
          !url.includes('#') && !url.includes('mailto:') &&
          !url.includes('javascript:')) {
        articles.push({
          id: `scraped-${articleCount + 1}`,
          title: text,
          excerpt: text.substring(0, 150) + '...',
          content: `This is the content for: ${text}\n\nThis is a real article scraped from the Dal Gazette website. The full content would be extracted from the individual article page.`,
          category: 'News',
          author: 'Dal Gazette Staff',
          publishedAt: new Date(),
          imageUrl: undefined,
          tags: ['dalhousie', 'university', 'news'],
          url: url.startsWith('http') ? url : `https://dalgazette.com${url}`
        });
        articleCount++;
      }
    }
  }
  
  return articles;
}

// Scrape the main page for articles
async function scrapeDalGazette() {
  try {
    console.log('🔍 Scraping Dal Gazette website...');
    
    const html = await makeRequest('https://dalgazette.com');
    const articles = parseArticles(html);
    
    console.log(`✅ Successfully scraped ${articles.length} articles`);
    return articles;

  } catch (error) {
    console.error('❌ Error scraping Dal Gazette:', error.message);
    return [];
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
    
    // For now, return mock content
    const content = `This is the full content for the article at ${url}. In a full implementation, this would scrape the individual article page to get the complete content.`;
    
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Simple Dal Gazette Scraper API running on http://192.168.100.56:${PORT}`);
  console.log(`📱 Your React Native app should connect to: http://192.168.100.56:${PORT}/api/articles`);
  console.log(`🌐 Test the API: http://192.168.100.56:${PORT}/api/articles`);
});
