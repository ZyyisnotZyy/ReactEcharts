import { serve } from "@/utils";
const UserLogin = (params) => {
  return serve({
    url: "/api/user/login",
    method: "post",
    params,
  });
};

export default UserLogin;
