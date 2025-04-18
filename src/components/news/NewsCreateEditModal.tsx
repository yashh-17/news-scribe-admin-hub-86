import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNewsStore } from "@/lib/news/news-store";
import { NEWS_CATEGORIES } from "@/lib/news/constants";
import { ImageUpload } from "./ImageUpload";
import { MediaUpload } from "./MediaUpload";
import { KeywordsInput } from "./KeywordsInput";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  image: z.string().optional(),
  audio: z.string().optional(),
  video: z.string().optional(),
  keywords: z.array(z.string()).min(1, "Add at least one keyword"),
});

type FormValues = z.infer<typeof formSchema>;

interface NewsCreateEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingNews: NewsItem | null;
}

export const NewsCreateEditModal = ({
  isOpen,
  onClose,
  editingNews,
}: NewsCreateEditModalProps) => {
  const { toast } = useToast();
  const { addNews, updateNews } = useNewsStore();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      image: "",
      audio: "",
      video: "",
      keywords: [],
    },
  });

  // Reset form when modal opens/closes or when editing different news
  useEffect(() => {
    if (isOpen) {
      if (editingNews) {
        form.reset({
          title: editingNews.title,
          content: editingNews.content,
          category: editingNews.category,
          image: editingNews.image || "",
          audio: editingNews.audio || "",
          video: editingNews.video || "",
          keywords: editingNews.keywords,
        });
      } else {
        form.reset({
          title: "",
          content: "",
          category: "",
          image: "",
          audio: "",
          video: "",
          keywords: [],
        });
      }
    }
  }, [isOpen, editingNews, form]);

  // Simulate file upload progress
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const onSubmit = (values: FormValues) => {
    if (editingNews) {
      // Fix: Ensure all required properties are included when updating news
      const updatedNews: NewsItem = {
        id: editingNews.id,
        title: values.title,
        content: values.content,
        category: values.category,
        image: values.image,
        audio: values.audio,
        video: values.video,
        keywords: values.keywords,
        createdAt: editingNews.createdAt,
        updatedAt: new Date().toISOString(),
      };
      
      updateNews(updatedNews);
      toast({
        title: "News Updated",
        description: "The news item has been successfully updated.",
      });
    } else {
      // Fix: Ensure all required properties are included when adding news
      const newNewsItem: NewsItem = {
        id: `NEWS-${Date.now().toString(36).toUpperCase()}`,
        title: values.title,
        content: values.content,
        category: values.category,
        image: values.image,
        audio: values.audio,
        video: values.video,
        keywords: values.keywords,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      addNews(newNewsItem);
      toast({
        title: "News Created",
        description: "The news item has been successfully created.",
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingNews ? "Edit News Item" : "Create News Item"}
          </DialogTitle>
          <DialogDescription>
            {editingNews
              ? "Make changes to the news item below."
              : "Fill out the form below to create a new news item."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter news title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter news content"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {NEWS_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      onUploadStart={simulateUpload}
                      progress={uploadProgress}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a featured image for this news item
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="audio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audio (optional)</FormLabel>
                    <FormControl>
                      <MediaUpload
                        type="audio"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Add an audio file or URL
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video (optional)</FormLabel>
                    <FormControl>
                      <MediaUpload
                        type="video"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Add a video file or URL
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <KeywordsInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Add keywords to help with search and categorization
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {editingNews ? "Update News" : "Create News"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
