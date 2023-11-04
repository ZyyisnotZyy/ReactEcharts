import { getStorage } from "@/utils/index";
import { Navigate } from "react-router-dom";
// 用户判断当前是否有用户 token
const AuthRoute = (props) => {
  // 有的话直接跳转到首页
  if (getStorage("userToken")) {
    return props.children;
  } else {
    // 直接 return 登录页
    return <Navigate to="/login" replace />;
  }
};

export default AuthRoute;
