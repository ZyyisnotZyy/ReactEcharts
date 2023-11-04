import { request } from "@/utils";
// 红旗区实时空气质量
export const AirqualityApi = (params) => {
  return request({
    url: "/air/now",
    method: "get",
    params,
  });
};
