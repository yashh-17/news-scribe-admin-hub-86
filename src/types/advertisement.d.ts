
interface Advertisement {
  id: string;
  title: string;
  image: string;
  redirectUrl?: string;
  postIds: string[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
