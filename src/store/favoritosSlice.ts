import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavorito } from '@/interfaces/IFavorito';

interface FavoritesState {
  items: IFavorito[];
}

const loadFavoritesFromLocalStorage = (): IFavorito[] => {
  if (typeof window !== "undefined") {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  return [];
};

const saveFavoritesToLocalStorage = (items: IFavorito[]) => {
  localStorage.setItem('favorites', JSON.stringify(items));
};

const initialState: FavoritesState = {
  items: loadFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IFavorito>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (!existingItem) {
        state.items.push(newItem);
        saveFavoritesToLocalStorage(state.items);
      }
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      saveFavoritesToLocalStorage(state.items);
    },

    clearFavorites: (state) => {
      state.items = [];
      saveFavoritesToLocalStorage(state.items);
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
