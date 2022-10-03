import { createSlice } from "@reduxjs/toolkit";

export const recipes = createSlice({
  name: "recipes",
  initialState: {
    newestRecipes: [],
    header: "",
    title: "",
    description: "",
    ingredients: [],
    mainCategory: "Main category",
    subCatergory: "Sub category",
    image: "",
    id: "",
    uploadFile: false,
    rating: 0
  },
  reducers: {
    setNewestRecipes: (state, action) => {
      state.newestRecipes = action.payload;
    },
    setHeader: (state, action) => {
      state.header = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setMainCategory: (state, action) => {
      state.mainCategory = action.payload;
    },
    setSubCatergory: (state, action) => {
      state.subCatergory = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setUploadFile: (state, action) => {
      state.uploadFile = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    }
  }
});
