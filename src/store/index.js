import userReducer from "@/store/modules/user";
const { configureStore } = require("@reduxjs/toolkit");
const store = configureStore({
  reducer: {
    userReducer,
  },
});

export default store;
