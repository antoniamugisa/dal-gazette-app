import { Article } from '../types';

// Note: Web scraping libraries like axios and cheerio don't work well in React Native
// For now, we'll use a mock implementation that simulates real scraping
// In a production app, you'd want to use a backend service for scraping

// Configuration
const DAL_GAZETTE_BASE_URL = 'https://dalgazette.com';
const REQUEST_TIMEOUT = 10000; // 10 seconds
const MAX_ARTICLES = 20;

// Helper function to clean text
const cleanText = (text: string): string => {
  return text.replace(/\s+/g, ' ').trim();
};

// Helper function to extract category from URL or content
const extractCategory = (url: string, title: string): string => {
  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();
  
  if (urlLower.includes('sports') || titleLower.includes('sport')) return 'Sports';
  if (urlLower.includes('culture') || urlLower.includes('arts') || titleLower.includes('art')) return 'Arts & Culture';
  if (urlLower.includes('opinion') || titleLower.includes('opinion')) return 'Opinions';
  return 'News';
};

// Helper function to generate unique ID
const generateId = (url: string, title: string): string => {
  // Use a simple hash function instead of Buffer for React Native compatibility
  const str = url + title;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `scraped-${Math.abs(hash).toString(36).slice(0, 10)}`;
};

// Main scraping function
export const scrapeDalGazette = async (): Promise<Article[]> => {
  try {
    console.log('🌐 Simulating Dal Gazette scraping...');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return realistic mock data that simulates what would be scraped
    console.log('📰 Found 8 articles from Dal Gazette');
    return getRealisticMockArticles();

  } catch (error) {
    console.error('❌ Error in scraping simulation:', error);
    console.log('📝 Returning fallback data due to error...');
    return getFallbackArticles();
  }
};

// Function to scrape individual article content
export const scrapeArticleContent = async (url: string): Promise<string> => {
  try {
    console.log(`📖 Simulating article content loading from: ${url}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return realistic mock content
    return getMockArticleContent(url);

  } catch (error) {
    console.error('❌ Error in content simulation:', error);
    return 'Article content could not be loaded. Please visit the website to read the full article.';
  }
};

// Helper function to parse date strings
const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  
  try {
    // Try various date formats
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }
  } catch (error) {
    console.warn('Could not parse date:', dateString);
  }
  
  return null;
};

// Helper function to extract tags from title and content
const extractTags = (title: string, content: string): string[] => {
  const text = (title + ' ' + content).toLowerCase();
  const tags: string[] = [];
  
  const commonTags = [
    'dalhousie', 'university', 'student', 'campus', 'halifax', 'nova scotia',
    'sports', 'hockey', 'basketball', 'football', 'athletics',
    'news', 'politics', 'government', 'education', 'research',
    'arts', 'culture', 'music', 'theater', 'art',
    'technology', 'science', 'health', 'environment',
  ];
  
  commonTags.forEach(tag => {
    if (text.includes(tag)) {
      tags.push(tag);
    }
  });
  
  return tags.slice(0, 5); // Limit to 5 tags
};

// Realistic mock articles that simulate what would be scraped from Dal Gazette
const getRealisticMockArticles = (): Article[] => {
  return [
    {
      id: 'scraped-1',
      title: 'What puts the power in Power Hour?',
      excerpt: 'Students gather for the weekly Power Hour event, discussing campus issues and student life.',
      content: 'Power Hour has become a cornerstone of student engagement at Dalhousie University. Every week, students from across campus gather to discuss pressing issues, share ideas, and build community. The event, which started as a small discussion group, has grown into one of the most popular student activities on campus. This week\'s Power Hour focused on sustainability initiatives and how students can contribute to making Dalhousie more environmentally friendly.',
      category: 'News',
      author: 'Sarah Johnson',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      imageUrl: undefined,
      tags: ['student life', 'campus', 'engagement'],
      url: 'https://dalgazette.com/power-hour-engagement'
    },
    {
      id: 'scraped-2',
      title: 'Petition for Dalhousie President\'s resignation gains over 1,000 signatures',
      excerpt: 'Students and faculty express concerns over recent university decisions in growing petition.',
      content: 'A petition calling for the resignation of Dalhousie University President has gained significant traction, with over 1,000 signatures from students, faculty, and alumni. The petition cites concerns over recent budget cuts, program closures, and what petitioners describe as a lack of transparency in university governance. University administration has responded by scheduling town hall meetings to address community concerns.',
      category: 'News',
      author: 'Michael Chen',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      imageUrl: undefined,
      tags: ['administration', 'governance', 'student voice'],
      url: 'https://dalgazette.com/president-petition'
    },
    {
      id: 'scraped-3',
      title: 'Meet Dal Innovates\' next generation of entrepreneurs',
      excerpt: 'Student entrepreneurs showcase innovative projects at the annual Dal Innovates showcase.',
      content: 'The Dal Innovates program continues to foster innovation and entrepreneurship among Dalhousie students. This year\'s showcase featured projects ranging from sustainable technology solutions to social impact initiatives. Students presented their ventures to industry professionals, potential investors, and the broader university community. The program has helped launch several successful startups and continues to be a driving force in Halifax\'s growing tech ecosystem.',
      category: 'News',
      author: 'Emma Rodriguez',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      imageUrl: undefined,
      tags: ['entrepreneurship', 'innovation', 'technology'],
      url: 'https://dalgazette.com/dal-innovates-showcase'
    },
    {
      id: 'scraped-4',
      title: 'Tigers Hockey Team Secures Playoff Spot',
      excerpt: 'Dalhousie Tigers men\'s hockey team clinches playoff berth with decisive victory over Saint Mary\'s.',
      content: 'The Dalhousie Tigers men\'s hockey team secured their spot in the AUS playoffs with a commanding 4-1 victory over cross-town rivals Saint Mary\'s University. The team\'s strong defensive play and timely scoring have been key factors in their successful season. Head coach praised the team\'s resilience and determination throughout the season. The Tigers will now prepare for the playoffs, hoping to make a deep run in the tournament.',
      category: 'Sports',
      author: 'Jake Thompson',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      imageUrl: undefined,
      tags: ['hockey', 'tigers', 'playoffs', 'athletics'],
      url: 'https://dalgazette.com/tigers-hockey-playoffs'
    },
    {
      id: 'scraped-5',
      title: 'New Arts and Culture Initiative Launches on Campus',
      excerpt: 'Dalhousie introduces comprehensive arts program to enhance student cultural experience.',
      content: 'Dalhousie University has launched a new Arts and Culture Initiative aimed at enriching the student experience through diverse cultural programming. The initiative includes partnerships with local arts organizations, student-led cultural events, and enhanced support for creative expression on campus. The program has already seen strong student participation and positive feedback from the community.',
      category: 'Arts & Culture',
      author: 'Lisa Park',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      imageUrl: undefined,
      tags: ['arts', 'culture', 'student life', 'programming'],
      url: 'https://dalgazette.com/arts-culture-initiative'
    },
    {
      id: 'scraped-6',
      title: 'Student Opinion: The Future of Campus Sustainability',
      excerpt: 'A student perspective on Dalhousie\'s environmental initiatives and what more can be done.',
      content: 'As Dalhousie University continues to implement sustainability measures across campus, students are calling for even more ambitious environmental goals. This opinion piece explores the current state of campus sustainability, highlights successful initiatives, and proposes additional steps the university could take to become a leader in environmental responsibility. The author argues that student involvement is crucial to achieving meaningful change.',
      category: 'Opinions',
      author: 'Alex Green',
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
      imageUrl: undefined,
      tags: ['sustainability', 'environment', 'opinion', 'student voice'],
      url: 'https://dalgazette.com/sustainability-opinion'
    },
    {
      id: 'scraped-7',
      title: 'Research Breakthrough in Marine Biology Department',
      excerpt: 'Dalhousie researchers make significant discovery in ocean conservation research.',
      content: 'Researchers in Dalhousie\'s Marine Biology Department have made a groundbreaking discovery that could have significant implications for ocean conservation efforts. The research, published in a leading scientific journal, reveals new insights into marine ecosystem dynamics and the impact of climate change on ocean life. The findings could inform future conservation strategies and policy decisions.',
      category: 'News',
      author: 'Dr. Maria Santos',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      imageUrl: undefined,
      tags: ['research', 'marine biology', 'conservation', 'climate change'],
      url: 'https://dalgazette.com/marine-biology-research'
    },
    {
      id: 'scraped-8',
      title: 'Halifax Food Scene: Student-Friendly Restaurants',
      excerpt: 'A guide to the best budget-friendly dining options near campus for students.',
      content: 'Halifax\'s vibrant food scene offers plenty of options for students looking for delicious, affordable meals. This guide highlights some of the best student-friendly restaurants within walking distance of campus, from cozy cafes perfect for studying to late-night spots for post-exam celebrations. Local business owners share their favorite student-friendly dishes and special offers.',
      category: 'News',
      author: 'Food & Lifestyle Team',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      imageUrl: undefined,
      tags: ['food', 'halifax', 'student life', 'dining'],
      url: 'https://dalgazette.com/halifax-food-guide'
    }
  ];
};

// Mock article content generator
const getMockArticleContent = (url: string): string => {
  const contentTemplates = [
    'This article explores the latest developments in campus life and student engagement. The story highlights the importance of community involvement and the positive impact it has on the university experience. Students and faculty members share their perspectives on the topic, providing valuable insights into the current state of campus culture.',
    'The research presented in this article sheds light on important issues affecting the university community. Through careful analysis and expert commentary, the piece provides readers with a comprehensive understanding of the topic. The findings have significant implications for future policy decisions and community initiatives.',
    'This feature story takes an in-depth look at the people and programs that make Dalhousie University a vibrant learning community. Through interviews and personal stories, readers gain insight into the diverse experiences that shape campus life. The article celebrates the achievements and contributions of students, faculty, and staff.',
    'The opinion piece presents a thoughtful analysis of current issues facing the university community. The author provides a balanced perspective while advocating for positive change. The piece encourages dialogue and engagement among readers, fostering a sense of community and shared purpose.',
    'This sports coverage brings readers the latest updates on Dalhousie athletics and student-athlete achievements. The article highlights the dedication and hard work of student-athletes while celebrating their successes on and off the field. The story captures the excitement and community spirit that surrounds university sports.'
  ];
  
  // Return content based on URL or random selection
  const index = Math.abs(url.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % contentTemplates.length;
  return contentTemplates[index];
};

// Fallback articles when scraping fails
const getFallbackArticles = (): Article[] => {
  return [
    {
      id: 'fallback-1',
      title: 'Dalhousie University News Update',
      excerpt: 'Stay informed with the latest news and updates from Dalhousie University.',
      content: 'This is a fallback article. The app is currently unable to fetch live articles from the Dal Gazette website. Please check your internet connection and try again.',
      category: 'News',
      author: 'Dal Gazette Staff',
      publishedAt: new Date(),
      imageUrl: undefined,
      tags: ['dalhousie', 'university', 'news'],
      url: 'https://dalgazette.com'
    },
    {
      id: 'fallback-2',
      title: 'Campus Life and Student Activities',
      excerpt: 'Discover what\'s happening on campus and get involved in student life.',
      content: 'This is a fallback article. The app is currently unable to fetch live articles from the Dal Gazette website. Please check your internet connection and try again.',
      category: 'News',
      author: 'Dal Gazette Staff',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      imageUrl: undefined,
      tags: ['campus', 'student', 'activities'],
      url: 'https://dalgazette.com'
    },
    {
      id: 'fallback-3',
      title: 'Sports and Athletics at Dalhousie',
      excerpt: 'Follow the Tigers and stay updated on all sports news and events.',
      content: 'This is a fallback article. The app is currently unable to fetch live articles from the Dal Gazette website. Please check your internet connection and try again.',
      category: 'Sports',
      author: 'Dal Gazette Staff',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      imageUrl: undefined,
      tags: ['sports', 'tigers', 'athletics'],
      url: 'https://dalgazette.com'
    }
  ];
};
