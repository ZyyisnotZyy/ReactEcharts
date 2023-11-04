import { request } from "@/utils";
// 天气预测5天空气质量
export const QualityforecastApi = (params) => {
  return request({
    url: "/air/5d",
    method: "get",
    params,
  });
};
