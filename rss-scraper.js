// RSS Feed scraper for Dal Gazette
// Run this with: node rss-scraper.js

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

// Structure article content with proper paragraphs and formatting
function structureArticleContent(content) {
  if (!content) return '';
  
  // First, clean up HTML entities
  let structured = content
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—');
  
  // Convert paragraph tags to proper paragraphs
  structured = structured.replace(/<p>/g, '<p>');
  structured = structured.replace(/<\/p>/g, '</p>');
  
  // Convert line breaks to paragraphs if there are no existing paragraph tags
  if (!structured.includes('<p>')) {
    // Split on double line breaks or periods followed by space and capital letter
    structured = structured
      .split(/\n\s*\n/)
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('\n\n');
  }
  
  // Clean up any remaining HTML tags we don't want
  structured = structured
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove scripts
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove styles
    .replace(/<div[^>]*>/g, '') // Remove div opening tags
    .replace(/<\/div>/g, '') // Remove div closing tags
    .replace(/<span[^>]*>/g, '') // Remove span opening tags
    .replace(/<\/span>/g, '') // Remove span closing tags
    .replace(/<br\s*\/?>/gi, '\n') // Convert br tags to line breaks
    .replace(/<strong>/g, '<b>') // Convert strong to b
    .replace(/<\/strong>/g, '</b>') // Convert strong to b
    .replace(/<em>/g, '<i>') // Convert em to i
    .replace(/<\/em>/g, '</i>') // Convert em to i
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi, '$2') // Remove links but keep text
    .replace(/<img[^>]*>/gi, '') // Remove images
    .replace(/<blockquote[^>]*>/g, '<blockquote>') // Clean blockquote tags
    .replace(/<\/blockquote>/g, '</blockquote>')
    .replace(/<ul[^>]*>/g, '<ul>') // Clean list tags
    .replace(/<\/ul>/g, '</ul>')
    .replace(/<ol[^>]*>/g, '<ol>') // Clean ordered list tags
    .replace(/<\/ol>/g, '</ol>')
    .replace(/<li[^>]*>/g, '<li>') // Clean list item tags
    .replace(/<\/li>/g, '</li>');
  
  // Clean up extra whitespace
  structured = structured
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove multiple consecutive line breaks
    .replace(/[ \t]+/g, ' ') // Replace multiple spaces/tabs with single space
    .trim();
  
  // If we still don't have proper paragraph structure, create it
  if (!structured.includes('<p>')) {
    const sentences = structured.split(/(?<=[.!?])\s+/);
    const paragraphs = [];
    let currentParagraph = '';
    
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim();
      if (sentence.length === 0) continue;
      
      currentParagraph += (currentParagraph ? ' ' : '') + sentence;
      
      // Create a new paragraph every 3-4 sentences or if we hit a natural break
      if ((i + 1) % 3 === 0 || sentence.includes('"') || sentence.includes('.')) {
        paragraphs.push(`<p>${currentParagraph}</p>`);
        currentParagraph = '';
      }
    }
    
    // Add any remaining content as a paragraph
    if (currentParagraph.trim()) {
      paragraphs.push(`<p>${currentParagraph}</p>`);
    }
    
    structured = paragraphs.join('\n\n');
  }
  
  return structured;
}

// Parse RSS XML to extract articles
function parseRSSFeed(xml) {
  const articles = [];
  
  // Extract items from RSS feed
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let articleCount = 0;
  
  while ((match = itemRegex.exec(xml)) !== null && articleCount < 10) {
    const itemContent = match[1];
    
    // Extract title (handle both CDATA and plain text)
    let titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    if (!titleMatch) {
      titleMatch = itemContent.match(/<title>(.*?)<\/title>/);
    }
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    // Extract link
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
    const link = linkMatch ? linkMatch[1].trim() : '';
    
    // Extract content (prefer content:encoded over description)
    let contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
    if (!contentMatch) {
      contentMatch = itemContent.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
    }
    const content = contentMatch ? contentMatch[1].trim() : '';
    
    // Extract publication date
    const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
    
    // Extract author
    const authorMatch = itemContent.match(/<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/);
    const author = authorMatch ? authorMatch[1].trim() : 'Dal Gazette Staff';
    
    // Extract categories
    const categoryMatches = itemContent.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g);
    const categories = categoryMatches ? categoryMatches.map(m => m.match(/<!\[CDATA\[(.*?)\]\]>/)[1]) : ['News'];
    
    if (title && title.length > 10) {
      // Structure the content with proper paragraphs and formatting
      const structuredContent = structureArticleContent(content);
      
      // Create excerpt (first 200 characters of clean text)
      const cleanExcerpt = structuredContent
        .replace(/<[^>]*>/g, '') // Remove HTML tags for excerpt
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#038;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();
      
      const excerpt = cleanExcerpt.length > 200 
        ? cleanExcerpt.substring(0, 200) + '...'
        : cleanExcerpt;
      
      // Parse date
      let publishedDate;
      try {
        publishedDate = new Date(pubDate);
        if (isNaN(publishedDate.getTime())) {
          publishedDate = new Date();
        }
      } catch (error) {
        publishedDate = new Date();
      }
      
      // Determine category based on categories and title
      let articleCategory = 'News';
      const allCategories = categories.join(' ').toLowerCase();
      const titleLower = title.toLowerCase();
      
      if (allCategories.includes('opinion') || titleLower.includes('opinion')) {
        articleCategory = 'Opinions';
      } else if (allCategories.includes('sport') || titleLower.includes('sport')) {
        articleCategory = 'Sports';
      } else if (allCategories.includes('art') || allCategories.includes('culture') || 
                 titleLower.includes('art') || titleLower.includes('culture')) {
        articleCategory = 'Arts & Culture';
      }
      
      articles.push({
        id: `rss-${articleCount + 1}`,
        title: title,
        excerpt: excerpt,
        content: structuredContent,
        category: articleCategory,
        author: author,
        publishedAt: publishedDate,
        imageUrl: undefined, // RSS doesn't include images
        tags: categories.map(c => c.toLowerCase()),
        url: link
      });
      
      articleCount++;
    }
  }
  
  return articles;
}

// Scrape the RSS feed for articles
async function scrapeRSSFeed() {
  try {
    console.log('🔍 Scraping Dal Gazette RSS feed...');
    
    const xml = await makeRequest('https://dalgazette.com/feed/');
    const articles = parseRSSFeed(xml);
    
    console.log(`✅ Successfully scraped ${articles.length} articles from RSS feed`);
    return articles;

  } catch (error) {
    console.error('❌ Error scraping RSS feed:', error.message);
    return [];
  }
}

// API Routes
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await scrapeRSSFeed();
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
    
    // For RSS articles, we already have the content, but we could fetch the full article if needed
    const content = `This is the full content for the article at ${url}. The RSS feed provides the article summary, and the full content would be available on the Dal Gazette website.`;
    
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Dal Gazette RSS Scraper API running on http://192.168.100.56:${PORT}`);
  console.log(`📱 Your React Native app should connect to: http://192.168.100.56:${PORT}/api/articles`);
  console.log(`🌐 Test the API: http://192.168.100.56:${PORT}/api/articles`);
  console.log(`📰 RSS Feed: https://dalgazette.com/feed/`);
});
