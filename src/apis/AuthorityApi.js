import { serve } from "@/utils";

const AuthorityApi = (params, token) => {
  return serve({
    url: "/api/user/authority",
    method: "post",
    headers: {
      Authorization: token,
    },
    params,
  });
};

export default AuthorityApi;
