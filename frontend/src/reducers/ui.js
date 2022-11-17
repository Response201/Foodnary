import { createSlice } from "@reduxjs/toolkit";

export const ui = createSlice({
  name: "ui",
  initialState: {
    loading: false,
    theme:'root',
    message:'',
    code: null,
    next:false,
    seeProfile:'',
    setSeeProfile_id:'',
    path:'',
    update:false,
    showWelcomePage: true,
    signInOrUp:false,
    showCropper:false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },  
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setNext: (state, action) => {

state.next = action.payload;

    },
    setSeeProfile: (state, action) => {
      state.seeProfile = action.payload;
    },


    setSeeProfile_id: (state, action) => {
      state.seeProfile_id = action.payload;
    },


    setPath: (state, action) => {
      state.path = action.payload;
    },
    setUpdate: (state, action) => {
      state.update = action.payload;
    },
    setShowWelcomePage: (state, action) => {
      state.showWelcomePage = action.payload;
    },
    setSignInOrUp: (state, action) => {
      state.signInOrUp = action.payload;
    },
    setShowCropper: (state, action) => {
      state.showCropper = action.payload;
    },

  }
});
