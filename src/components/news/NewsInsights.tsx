
import React from 'react';
import { MessageSquare, Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format } from "date-fns";

interface Comment {
  id: string;
  userName: string;
  content: string;
  timestamp: string;
}

interface NewsInsightsProps {
  newsId: string;
  likes: number;
  comments: Comment[];
}

export function NewsInsights({ newsId, likes, comments }: NewsInsightsProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Insights & Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <Heart className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-2xl font-bold">{likes}</p>
              <p className="text-sm text-gray-600">Likes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{comments.length}</p>
              <p className="text-sm text-gray-600">Comments</p>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="comments">
            <AccordionTrigger className="text-lg">
              View Comments
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No comments yet</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold">{comment.userName}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(comment.timestamp), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
