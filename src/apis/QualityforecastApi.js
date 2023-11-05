import { request } from "@/utils";
// 天气预测5天空气质量
const QualityforecastApi = (params) => {
  return request({
    url: "/air/5d",
    method: "get",
    params,
  });
};

export default QualityforecastApi;
