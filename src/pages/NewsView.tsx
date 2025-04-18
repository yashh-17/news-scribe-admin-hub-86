import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { useNewsStore } from "@/lib/news/news-store";
import { format } from "date-fns";
import { useAdvertisementStore } from "@/lib/advertisement/advertisement-store";
import { NewsAdvertisementDisplay } from "@/components/advertisements/NewsAdvertisementDisplay";
import { NewsInsights } from "@/components/news/NewsInsights";

const mockComments = [
  {
    id: "1",
    userName: "John Doe",
    content: "Great article! Very informative.",
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    userName: "Jane Smith",
    content: "This helped me understand the topic better.",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
];

const NewsView = () => {
  const { id } = useParams<{ id: string }>();
  const { newsItems } = useNewsStore();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(42);

  useEffect(() => {
    if (id) {
      const item = newsItems.find(item => item.id === id);
      setNewsItem(item || null);
    }
    setLoading(false);
  }, [id, newsItems]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="animate-pulse h-4 w-1/4 bg-gray-200 rounded mb-8"></div>
        <div className="animate-pulse h-64 bg-gray-200 rounded mb-6"></div>
        <div className="animate-pulse h-4 bg-gray-200 rounded mb-2"></div>
        <div className="animate-pulse h-4 bg-gray-200 rounded mb-2"></div>
        <div className="animate-pulse h-4 bg-gray-200 rounded mb-2"></div>
        <div className="animate-pulse h-4 w-2/3 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">News Article Not Found</h2>
          <p className="text-red-700 mb-4">The news article you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to News Dashboard
      </Link>
      
      <div className="mb-6">
        <NewsAdvertisementDisplay newsId={newsItem.id} />
      </div>
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {newsItem.image && (
          <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
            <img 
              src={newsItem.image} 
              alt={newsItem.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              {newsItem.category}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {format(new Date(newsItem.createdAt), "MMM d, yyyy")}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <User className="mr-1 h-3 w-3" />
              Admin
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {newsItem.title}
          </h1>
          
          <div className="prose max-w-none mb-6">
            {newsItem.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
          
          {newsItem.audio && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Audio</h3>
              <audio controls className="w-full">
                <source src={newsItem.audio} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          
          {newsItem.video && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Video</h3>
              <video controls className="w-full rounded">
                <source src={newsItem.video} />
                Your browser does not support the video element.
              </video>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
            <Tag className="h-4 w-4 text-gray-500 mr-2" />
            {newsItem.keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </article>

      <NewsInsights 
        newsId={newsItem?.id || ''} 
        likes={likes} 
        comments={mockComments} 
      />
    </div>
  );
};

export default NewsView;
