import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/store';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  type: string;
}

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await axios.get('/api/get-recipes');
  return response.data.data;
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectLoading = (state: RootState) => state.recipes.loading;
export const selectError = (state: RootState) => state.recipes.error;
export default recipesSlice.reducer;
