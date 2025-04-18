
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface UserStoreState {
  users: User[];
  searchTerm: string;
  sortField: keyof User | null;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
  addUser: (user: Omit<User, "id" | "createdAt" | "updatedAt">) => void;
  updateUser: (id: string, user: Partial<Omit<User, "id" | "createdAt">>) => void;
  deleteUser: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setSorting: (field: keyof User | null, direction: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
}

// Sample mock data for initial state
const mockUsers: User[] = [
  {
    id: "USER-1AB2CD",
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1 (555) 123-4567",
    location: "New York, USA",
    role: "Editor",
    status: "active",
    createdAt: "2023-04-15T08:30:00Z",
    updatedAt: "2023-04-15T08:30:00Z",
  },
  {
    id: "USER-3EF4GH",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "+1 (555) 987-6543",
    location: "Los Angeles, USA",
    role: "Admin",
    status: "active",
    createdAt: "2023-04-10T14:20:00Z",
    updatedAt: "2023-04-10T15:45:00Z",
  },
  {
    id: "USER-5IJ6KL",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    mobile: "+1 (555) 456-7890",
    location: "Chicago, USA",
    role: "Author",
    status: "inactive",
    createdAt: "2023-04-08T10:15:00Z",
    updatedAt: "2023-04-08T10:15:00Z",
  },
  {
    id: "USER-7MN8OP",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    mobile: "+1 (555) 789-0123",
    location: "Miami, USA",
    role: "Author",
    status: "active",
    createdAt: "2023-04-05T09:45:00Z",
    updatedAt: "2023-04-05T11:30:00Z",
  },
  {
    id: "USER-9QR0ST",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    mobile: "+1 (555) 234-5678",
    location: "Seattle, USA",
    role: "Editor",
    status: "active",
    createdAt: "2023-04-02T16:20:00Z",
    updatedAt: "2023-04-02T16:20:00Z",
  },
  {
    id: "USER-1UV2WX",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    mobile: "+1 (555) 345-6789",
    location: "Boston, USA",
    role: "Author",
    status: "active",
    createdAt: "2023-03-30T13:10:00Z",
    updatedAt: "2023-03-30T13:10:00Z",
  },
  {
    id: "USER-3YZ4AB",
    name: "David Anderson",
    email: "david.anderson@example.com",
    mobile: "+1 (555) 567-8901",
    location: "Denver, USA",
    role: "Admin",
    status: "active",
    createdAt: "2023-03-28T11:25:00Z",
    updatedAt: "2023-03-28T11:25:00Z",
  },
  {
    id: "USER-5CD6EF",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    mobile: "+1 (555) 890-1234",
    location: "Austin, USA",
    role: "Editor",
    status: "inactive",
    createdAt: "2023-03-25T09:15:00Z",
    updatedAt: "2023-03-25T09:15:00Z",
  },
  {
    id: "USER-7GH8IJ",
    name: "Christopher Martinez",
    email: "christopher.martinez@example.com",
    mobile: "+1 (555) 901-2345",
    location: "San Francisco, USA",
    role: "Author",
    status: "active",
    createdAt: "2023-03-23T14:40:00Z",
    updatedAt: "2023-03-23T16:30:00Z",
  },
  {
    id: "USER-9KL0MN",
    name: "Jessica Thompson",
    email: "jessica.thompson@example.com",
    mobile: "+1 (555) 012-3456",
    location: "Portland, USA",
    role: "Editor",
    status: "active",
    createdAt: "2023-03-20T10:50:00Z",
    updatedAt: "2023-03-20T10:50:00Z",
  }
];

// Load users from localStorage if available
const loadUsersFromStorage = (): User[] => {
  try {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : mockUsers;
  } catch (error) {
    console.error("Error loading users from storage:", error);
    return mockUsers;
  }
};

// Save users to localStorage
const saveUsersToStorage = (users: User[]) => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to storage:", error);
  }
};

export const useUserStore = create<UserStoreState>((set, get) => ({
  users: loadUsersFromStorage(),
  searchTerm: "",
  sortField: null,
  sortDirection: 'asc',
  currentPage: 1,
  itemsPerPage: 10,
  
  addUser: (user) => {
    set((state) => {
      const newUser: User = {
        ...user,
        id: `USER-${uuidv4().substring(0, 6).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedUsers = [newUser, ...state.users];
      saveUsersToStorage(updatedUsers);
      return { users: updatedUsers };
    });
  },
  
  updateUser: (id, updates) => {
    set((state) => {
      const updatedUsers = state.users.map((user) => 
        user.id === id 
          ? { ...user, ...updates, updatedAt: new Date().toISOString() }
          : user
      );
      saveUsersToStorage(updatedUsers);
      return { users: updatedUsers };
    });
  },
  
  deleteUser: (id) => {
    set((state) => {
      const updatedUsers = state.users.filter((user) => user.id !== id);
      saveUsersToStorage(updatedUsers);
      return { users: updatedUsers };
    });
  },
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setSorting: (field, direction) => set({ 
    sortField: field, 
    sortDirection: direction 
  }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
}));

// Get filtered and sorted users
export const getFilteredSortedUsers = (state: UserStoreState) => {
  const { users, searchTerm, sortField, sortDirection } = state;
  
  // First filter the users
  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower) ||
      user.mobile.toLowerCase().includes(searchTermLower) ||
      user.location.toLowerCase().includes(searchTermLower) ||
      user.role.toLowerCase().includes(searchTermLower)
    );
  });
  
  // Then sort the filtered users
  if (sortField) {
    filteredUsers.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  return filteredUsers;
};

// Get paginated users
export const getPaginatedUsers = (state: UserStoreState) => {
  const filteredSortedUsers = getFilteredSortedUsers(state);
  const { currentPage, itemsPerPage } = state;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return filteredSortedUsers.slice(startIndex, endIndex);
};

// Get total pages
export const getTotalPages = (state: UserStoreState) => {
  const filteredUsers = getFilteredSortedUsers(state);
  return Math.ceil(filteredUsers.length / state.itemsPerPage);
};
