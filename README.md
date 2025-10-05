# Dal Gazette Mobile App

A mobile-first newspaper app for Dalhousie University students and faculty, bringing the Dal Gazette campus newspaper to your mobile device.

## Features

### Home Screen
- **Featured Stories**: Highlighted articles with large images
- **Latest News Feed**: Scrollable list of recent articles
- **Category Filtering**: Filter by News, Arts & Culture, Opinions, and Sports
- **Search Functionality**: Search articles by title, content, or author
- **Pull-to-Refresh**: Update content with a simple pull gesture

### Navigation
- **Bottom Tab Bar**: Easy access to Home, News, Sports, and Culture sections
- **Article Detail View**: Full-screen article reading experience
- **Smooth Animations**: Polished transitions between screens

### Design
- **Dalhousie Branding**: Official Dalhousie gold and black color scheme
- **Mobile-First**: Optimized for mobile devices with touch-friendly interface
- **Category Colors**: Distinct colors for each content category
- **Modern UI**: Clean, card-based design with proper spacing and typography

### Content
- **Real-time Updates**: Fresh content from the Dal Gazette website
- **Article Metadata**: Author, publish date, and category information
- **Image Support**: High-quality images for articles
- **Tag System**: Categorized content for easy discovery

## Technical Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development and deployment platform
- **TypeScript**: Type-safe development
- **React Navigation**: Screen navigation and routing
- **Lucide React Native**: Beautiful, customizable icons
- **Context API**: State management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dal-gazette-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - For iOS: Press `i` in the terminal or scan QR code with Expo Go app
   - For Android: Press `a` in the terminal or scan QR code with Expo Go app
   - For web: Press `w` in the terminal

### Development Commands

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ArticleCard.tsx
│   ├── CategoryChip.tsx
│   ├── SearchBar.tsx
│   └── LoadingSpinner.tsx
├── screens/            # Main app screens
│   ├── HomeScreen.tsx
│   ├── NewsScreen.tsx
│   ├── SportsScreen.tsx
│   ├── CultureScreen.tsx
│   └── ArticleDetailScreen.tsx
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── context/           # Global state management
│   └── AppContext.tsx
├── types/             # TypeScript type definitions
│   └── index.ts
├── constants/         # App constants and configuration
│   ├── theme.ts
│   └── mockData.ts
└── utils/             # Utility functions
    └── scraper.ts
```

## Features in Development

- [ ] **Web Scraping**: Real-time content from dalgazette.com
- [ ] **Push Notifications**: Breaking news alerts
- [ ] **Bookmarks**: Save articles for later reading
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Offline Reading**: Cache articles for offline access
- [ ] **Share Functionality**: Share articles via social media
- [ ] **User Authentication**: Personalized experience
- [ ] **Comment System**: Reader engagement features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Dal Gazette Team**: For providing excellent campus journalism
- **Dalhousie University**: For fostering a vibrant campus community
- **React Native Community**: For the amazing development tools and libraries

## Contact

For questions or suggestions, please contact the development team or open an issue on GitHub.

---

**Bringing real journalism and reading comprehension back to campus, one article at a time.**
