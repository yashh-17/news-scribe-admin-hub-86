
import { useEffect, useState } from "react";
import { useAdvertisementStore } from "@/lib/advertisement/advertisement-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface NewsAdvertisementDisplayProps {
  newsId: string;
}

export function NewsAdvertisementDisplay({ newsId }: NewsAdvertisementDisplayProps) {
  const { advertisements } = useAdvertisementStore();
  const [relevantAds, setRelevantAds] = useState<Advertisement[]>([]);

  useEffect(() => {
    // Filter advertisements that are linked to this news article and are active
    const ads = advertisements.filter(ad => 
      ad.isActive && ad.postIds.includes(newsId)
    );
    setRelevantAds(ads);
  }, [advertisements, newsId]);

  if (relevantAds.length === 0) {
    return null;
  }

  const handleAdClick = (ad: Advertisement) => {
    if (ad.redirectUrl) {
      window.open(ad.redirectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Sponsored Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relevantAds.map((ad) => (
          <Card 
            key={ad.id} 
            className={`overflow-hidden ${ad.redirectUrl ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
            onClick={() => ad.redirectUrl && handleAdClick(ad)}
          >
            <div className="relative">
              {ad.redirectUrl && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-blue-500 text-white flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    <span className="text-xs">Ad</span>
                  </Badge>
                </div>
              )}
              <img 
                src={ad.image} 
                alt={ad.title} 
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{ad.title}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
