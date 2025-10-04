import { Article } from '../types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Dalhousie Students Rally for Climate Action',
    excerpt: 'Hundreds of students gathered on the Studley Quad to demand immediate action on climate change policies.',
    content: 'Full article content about the climate rally...',
    category: 'News',
    author: 'Sarah Johnson',
    publishedAt: new Date('2024-01-15T10:30:00Z'),
    imageUrl: 'https://via.placeholder.com/400x250/FDB913/FFFFFF?text=Climate+Rally',
    tags: ['climate', 'activism', 'environment'],
    url: 'https://dalgazette.com/climate-rally'
  },
  {
    id: '2',
    title: 'Tigers Basketball Team Advances to Championship',
    excerpt: 'The Dalhousie Tigers secured their spot in the AUS championship with a thrilling overtime victory.',
    content: 'Full article content about the basketball game...',
    category: 'Sports',
    author: 'Mike Chen',
    publishedAt: new Date('2024-01-14T18:45:00Z'),
    imageUrl: 'https://via.placeholder.com/400x250/F97316/FFFFFF?text=Basketball+Championship',
    tags: ['basketball', 'championship', 'tigers'],
    url: 'https://dalgazette.com/tigers-basketball-championship'
  },
  {
    id: '3',
    title: 'Student Art Exhibition Opens at Dalhousie Art Gallery',
    excerpt: 'The annual student showcase features works from emerging artists across various disciplines.',
    content: 'Full article content about the art exhibition...',
    category: 'Arts & Culture',
    author: 'Emma Rodriguez',
    publishedAt: new Date('2024-01-13T14:20:00Z'),
    imageUrl: 'https://via.placeholder.com/400x250/A855F7/FFFFFF?text=Art+Exhibition',
    tags: ['art', 'exhibition', 'gallery'],
    url: 'https://dalgazette.com/student-art-exhibition'
  },
  {
    id: '4',
    title: 'Opinion: The Future of Online Learning at Dalhousie',
    excerpt: 'A student perspective on how hybrid learning models are shaping the university experience.',
    content: 'Full article content about online learning...',
    category: 'Opinions',
    author: 'Alex Thompson',
    publishedAt: new Date('2024-01-12T09:15:00Z'),
    imageUrl: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Online+Learning',
    tags: ['education', 'technology', 'opinion'],
    url: 'https://dalgazette.com/online-learning-opinion'
  },
  {
    id: '5',
    title: 'New Research Lab Opens in Life Sciences Building',
    excerpt: 'The state-of-the-art facility will support cutting-edge research in biotechnology and genetics.',
    content: 'Full article content about the research lab...',
    category: 'News',
    author: 'Dr. Jennifer Walsh',
    publishedAt: new Date('2024-01-11T16:30:00Z'),
    imageUrl: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=Research+Lab',
    tags: ['research', 'science', 'facilities'],
    url: 'https://dalgazette.com/research-lab-opening'
  },
  {
    id: '6',
    title: 'Dalhousie Music Society Presents Winter Concert',
    excerpt: 'An evening of classical and contemporary music featuring student performers and faculty.',
    content: 'Full article content about the music concert...',
    category: 'Arts & Culture',
    author: 'Maria Santos',
    publishedAt: new Date('2024-01-10T20:00:00Z'),
    imageUrl: 'https://via.placeholder.com/400x250/A855F7/FFFFFF?text=Winter+Concert',
    tags: ['music', 'concert', 'performance'],
    url: 'https://dalgazette.com/winter-concert'
  }
];
