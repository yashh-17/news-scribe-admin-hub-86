
import { create } from "zustand";

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  image?: string;
  audio?: string;
  video?: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

interface NewsStoreState {
  newsItems: NewsItem[];
  searchTerm: string;
  selectedCategory: string;
  itemsPerPage: number;
  addNews: (news: NewsItem) => void;
  updateNews: (updatedNews: NewsItem) => void;
  deleteNews: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  filteredNewsItems: NewsItem[];
  paginatedNewsItems: NewsItem[];
  totalPages: number;
}

// Sample mock data for initial state
const mockNewsItems: NewsItem[] = [
  {
    id: "NEWS-1MF93K",
    title: "New Technology Breakthrough in AI",
    content: "Researchers have developed a new machine learning algorithm that promises to revolutionize how AI understands natural language.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    keywords: ["AI", "Machine Learning", "Technology"],
    createdAt: "2023-04-10T08:30:00Z",
    updatedAt: "2023-04-10T08:30:00Z",
  },
  {
    id: "NEWS-2AB7CD",
    title: "Global Summit on Climate Change Begins",
    content: "World leaders gather to discuss urgent measures to combat climate change and reduce carbon emissions worldwide.",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1610552050890-fe99536c2615?auto=format&fit=crop&w=800&q=80",
    keywords: ["Climate Change", "Politics", "Global Summit"],
    createdAt: "2023-04-09T14:20:00Z",
    updatedAt: "2023-04-09T15:45:00Z",
  },
  {
    id: "NEWS-3DE98F",
    title: "Market Trends Show Strong Economic Recovery",
    content: "Recent economic indicators suggest a robust recovery in global markets, with key sectors showing significant growth.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    keywords: ["Economy", "Markets", "Business"],
    createdAt: "2023-04-08T10:15:00Z",
    updatedAt: "2023-04-08T10:15:00Z",
  },
  {
    id: "NEWS-4GH12J",
    title: "Breakthrough in Renewable Energy Storage",
    content: "Scientists have developed a new battery technology that could make renewable energy more reliable and cost-effective.",
    category: "Science",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
    video: "https://example.com/video.mp4",
    keywords: ["Renewable Energy", "Science", "Technology"],
    createdAt: "2023-04-07T09:45:00Z",
    updatedAt: "2023-04-07T11:30:00Z",
  },
  {
    id: "NEWS-5KL75M",
    title: "Cultural Festival Celebrates Diversity",
    content: "The annual Global Cultural Festival kicked off with performances and exhibitions celebrating cultural diversity from around the world.",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=800&q=80",
    audio: "https://example.com/audio.mp3",
    keywords: ["Culture", "Festival", "Art"],
    createdAt: "2023-04-06T16:20:00Z",
    updatedAt: "2023-04-06T16:20:00Z",
  },
];

export const useNewsStore = create<NewsStoreState>((set, get) => ({
  newsItems: mockNewsItems,
  searchTerm: "",
  selectedCategory: "",
  itemsPerPage: 10,
  
  addNews: (news) => set((state) => ({
    newsItems: [news, ...state.newsItems],
  })),
  
  updateNews: (updatedNews) => set((state) => ({
    newsItems: state.newsItems.map((news) => 
      news.id === updatedNews.id ? updatedNews : news
    ),
  })),
  
  deleteNews: (id) => set((state) => ({
    newsItems: state.newsItems.filter((news) => news.id !== id),
  })),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  get filteredNewsItems() {
    const state = get();
    return state.newsItems.filter((news) => {
      // Filter by search term
      const matchesSearch = state.searchTerm === "" || 
        news.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        news.keywords.some(keyword => 
          keyword.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      
      // Filter by category
      const matchesCategory = state.selectedCategory === "" || 
        news.category === state.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  },
  
  get paginatedNewsItems() {
    const filteredItems = get().filteredNewsItems;
    return filteredItems;
  },
  
  get totalPages() {
    const filteredItems = get().filteredNewsItems;
    return Math.ceil(filteredItems.length / get().itemsPerPage);
  },
}));
