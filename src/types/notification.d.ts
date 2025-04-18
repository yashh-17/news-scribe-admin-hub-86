
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  createdAt: string;
  read: boolean;
  linkTo?: string;
  source: "report" | "comment" | "news" | "system" | "user";
}
