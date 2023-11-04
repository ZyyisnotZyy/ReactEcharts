import { request } from "@/utils";
// 每日天气预报 7 天
export const henWeatherF = (params) => {
  return request({
    url: "/weather/7d",
    method: "get",
    params,
  });
};
