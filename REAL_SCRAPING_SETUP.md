# Real Dal Gazette Scraping Setup

This guide will help you set up real web scraping to get live content from the Dal Gazette website.

## Step 1: Install Backend Dependencies

```bash
# Install backend dependencies
npm install express axios cheerio cors nodemon

# Or copy the backend-package.json and run:
cp backend-package.json package.json
npm install
```

## Step 2: Start the Backend Scraper

```bash
# Start the backend scraper service
node backend-scraper.js

# Or for development with auto-restart:
npx nodemon backend-scraper.js
```

You should see:
```
🚀 Dal Gazette Scraper API running on http://localhost:3001
📱 Your React Native app should connect to: http://localhost:3001/api/articles
```

## Step 3: Test the API

Open your browser and go to: http://localhost:3001/api/articles

You should see JSON data with real articles from the Dal Gazette website.

## Step 4: Start Your React Native App

```bash
# In a new terminal, start your React Native app
npx expo start --clear
```

## Step 5: Test Real Articles

1. Open your app
2. You should now see real articles from the Dal Gazette website
3. Tap on any article to see the real content

## Troubleshooting

### If you see "Network request failed":
- Make sure the backend scraper is running on port 3001
- Check that your computer's firewall isn't blocking the connection
- Try accessing http://localhost:3001/api/articles in your browser

### If you see fallback articles:
- The backend scraper is not running or not accessible
- Check the backend terminal for error messages
- Make sure you can access the Dal Gazette website from your computer

### If articles are empty or incomplete:
- The Dal Gazette website structure might have changed
- Check the backend terminal for scraping errors
- The website might be blocking automated requests

## How It Works

1. **Backend Service**: Runs on your computer and scrapes the Dal Gazette website
2. **API Endpoints**: 
   - `GET /api/articles` - Gets list of articles
   - `POST /api/article-content` - Gets full content of a specific article
3. **React Native App**: Connects to the backend API to get real articles
4. **Fallback**: If the backend is not available, shows fallback articles

## Production Deployment

For production, you would:
1. Deploy the backend service to a cloud provider (Heroku, AWS, etc.)
2. Update the API_BASE_URL in your React Native app
3. Set up proper error handling and caching

## Alternative: Use a Web Scraping Service

Instead of running your own backend, you could use services like:
- ScrapingBee
- ScraperAPI
- Bright Data
- Apify

These services handle the scraping and provide APIs for your app to use.
