
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface AdvertisementState {
  advertisements: Advertisement[];
  addAdvertisement: (ad: Omit<Advertisement, "id" | "createdAt" | "updatedAt">) => void;
  updateAdvertisement: (id: string, ad: Partial<Omit<Advertisement, "id" | "createdAt">>) => void;
  deleteAdvertisement: (id: string) => void;
  toggleAdvertisementStatus: (id: string) => void;
}

// Load initial data from localStorage if available
const getInitialAds = (): Advertisement[] => {
  if (typeof window === "undefined") return [];
  
  const savedAds = localStorage.getItem("advertisements");
  return savedAds ? JSON.parse(savedAds) : [];
};

// Save ads to localStorage whenever they change
const saveAdsToStorage = (ads: Advertisement[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("advertisements", JSON.stringify(ads));
  }
};

export const useAdvertisementStore = create<AdvertisementState>((set) => ({
  advertisements: getInitialAds(),
  
  addAdvertisement: (ad) => set((state) => {
    const newAd: Advertisement = {
      ...ad,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedAds = [...state.advertisements, newAd];
    saveAdsToStorage(updatedAds);
    
    return { advertisements: updatedAds };
  }),
  
  updateAdvertisement: (id, updates) => set((state) => {
    const updatedAds = state.advertisements.map(ad => 
      ad.id === id 
        ? { ...ad, ...updates, updatedAt: new Date().toISOString() } 
        : ad
    );
    
    saveAdsToStorage(updatedAds);
    
    return { advertisements: updatedAds };
  }),
  
  deleteAdvertisement: (id) => set((state) => {
    const updatedAds = state.advertisements.filter(ad => ad.id !== id);
    saveAdsToStorage(updatedAds);
    
    return { advertisements: updatedAds };
  }),
  
  toggleAdvertisementStatus: (id) => set((state) => {
    const updatedAds = state.advertisements.map(ad => 
      ad.id === id 
        ? { ...ad, isActive: !ad.isActive, updatedAt: new Date().toISOString() } 
        : ad
    );
    
    saveAdsToStorage(updatedAds);
    
    return { advertisements: updatedAds };
  }),
}));
