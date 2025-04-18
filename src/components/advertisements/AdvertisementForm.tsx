
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/news/ImageUpload";
import { useNewsStore } from "@/lib/news/news-store";
import { X } from "lucide-react";
import { useAdvertisementStore } from "@/lib/advertisement/advertisement-store";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  image: z.string().min(1, "Advertisement image is required"),
  redirectUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  postIds: z.array(z.string()).min(1, "Select at least one post"),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface AdvertisementFormProps {
  editingAd: Advertisement | null;
  onClose: () => void;
}

export const AdvertisementForm = ({ editingAd, onClose }: AdvertisementFormProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const { newsItems } = useNewsStore();
  const { addAdvertisement, updateAdvertisement } = useAdvertisementStore();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editingAd?.title || "",
      image: editingAd?.image || "",
      redirectUrl: editingAd?.redirectUrl || "",
      postIds: editingAd?.postIds || [],
      isActive: editingAd?.isActive ?? true,
    },
  });

  // Set initial selected posts if editing
  useEffect(() => {
    if (editingAd) {
      setSelectedPosts(editingAd.postIds);
      form.reset({
        title: editingAd.title,
        image: editingAd.image,
        redirectUrl: editingAd.redirectUrl || "",
        postIds: editingAd.postIds,
        isActive: editingAd.isActive,
      });
    }
  }, [editingAd, form]);

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handlePostSelection = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts(prev => [...prev, id]);
      form.setValue("postIds", [...selectedPosts, id]);
    } else {
      const filtered = selectedPosts.filter(postId => postId !== id);
      setSelectedPosts(filtered);
      form.setValue("postIds", filtered);
    }
    form.trigger("postIds");
  };

  const onSubmit = (values: FormValues) => {
    try {
      if (editingAd) {
        updateAdvertisement(editingAd.id, values);
        toast({
          title: "Advertisement Updated",
          description: "The advertisement has been updated successfully.",
        });
      } else {
        addAdvertisement(values);
        toast({
          title: "Advertisement Created",
          description: "The advertisement has been created successfully.",
        });
      }
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving the advertisement.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter advertisement title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advertisement Image</FormLabel>
              <FormControl>
                <ImageUpload 
                  value={field.value} 
                  onChange={field.onChange} 
                  onUploadStart={simulateUpload}
                  progress={uploadProgress}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="redirectUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Redirect URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
                <p className="text-sm text-muted-foreground">
                  This advertisement will be displayed if active
                </p>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="postIds"
          render={() => (
            <FormItem>
              <FormLabel>Associate with Posts</FormLabel>
              <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                {newsItems.length > 0 ? (
                  <div className="space-y-2">
                    {newsItems.map((news) => (
                      <div key={news.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`post-${news.id}`}
                          checked={selectedPosts.includes(news.id)}
                          onCheckedChange={(checked) => 
                            handlePostSelection(news.id, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={`post-${news.id}`}
                          className="text-sm cursor-pointer truncate"
                        >
                          {news.title}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No posts available</p>
                )}
              </div>
              {form.formState.errors.postIds && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.postIds.message}
                </p>
              )}
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {editingAd ? "Update" : "Create"} Advertisement
          </Button>
        </div>
      </form>
    </Form>
  );
};
