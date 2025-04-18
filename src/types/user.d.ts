
interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  location: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
