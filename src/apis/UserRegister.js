import { serve } from "@/utils";

const UserRegister = (params) => {
  return serve({
    url: "/api/user/register",
    method: "post",
    params,
  });
};

export default UserRegister;
