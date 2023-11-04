const { createSlice } = require("@reduxjs/toolkit");

const useStore = createSlice({
  name: "useStore",
  initialState: {
    UserInfo: {
      // 用户名
      userName: "",
      // 密码
      passWord: "",
    },
    // token
    userToken: "",
  },
  reducers: {
    setUserInfo(state, actions) {
      state.UserInfo.userName = actions.payload.username;
      state.UserInfo.passWord = actions.payload.password;
    },
    setUserToken(state, actions) {
      state.userToken = actions.payload;
    },
    // 清空 用户名 密码
    clearUserInfo(state, actions) {
      state.UserInfo.userName = "";
      state.UserInfo.passWord = "";
    },
    // 清空 token
    clearUserToken(state, actions) {
      state.userToken = "";
    },
  },
});
const { setUserInfo, setUserToken, clearUserInfo, clearUserToken } =
  useStore.actions;
const userReducer = useStore.reducer;
export { setUserInfo, setUserToken, clearUserInfo, clearUserToken };
export default userReducer;
