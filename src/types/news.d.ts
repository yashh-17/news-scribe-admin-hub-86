
interface NewsItem {
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
