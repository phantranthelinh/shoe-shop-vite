import { create } from "zustand";

interface WishlistItem {
  id: string;
  [key: string]: any; // Allow for additional properties
}

interface WishlistState {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  deleteFromWishlist: (id: string) => void;
}

const useWishlistStore = create<WishlistState>((set) => ({
  wishlistItems: [],

  addToWishlist: (item) => {
    set((state) => {
      const existingItem = state.wishlistItems.find((p) => p.id === item.id);
      if (!existingItem) {
        return { wishlistItems: [...state.wishlistItems, item] };
      }
      return state; // No change if the item already exists
    });
  },

  deleteFromWishlist: (id) => {
    set((state) => ({
      wishlistItems: state.wishlistItems.filter((item) => item.id !== id),
    }));
  },
}));

// Custom hook to access the wishlist store
export const useWishlist = () => {
  return useWishlistStore();
};

// Exporting methods for direct use
export const { addToWishlist, deleteFromWishlist } = useWishlistStore.getState();