import { getStorage } from "@/utils/index";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// 用户判断当前是否有用户 token
const AuthRoute = (props) => {
  // 这里要比较 localStorage 和 react-redux 中的 toekn 是否一致
  const { userToken } = useSelector((state) => state.userReducer);
  if (getStorage("userToken") === userToken) {
    return props.children;
  } else {
    // 直接 return 登录页
    return <Navigate to="/login" replace />;
  }
};

export default AuthRoute;
