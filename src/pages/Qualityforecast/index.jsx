import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Breadcrumb } from "antd";
import { QualityforecastApi } from "@/apis/QualityforecastApi";

const Qualityforecast = () => {
  // 数据数组化
  const [qualityList, setqualityList] = useState([]);
  // 空气质量数据 Api
  useEffect(() => {
    const qualityApi = async () => {
      let obj = {
        location: 101180309,
        key: "d2b69ce32e614aa0a4a7e7ba2f09c157",
      };
      const result = await QualityforecastApi(obj);
      setqualityList(result.data.daily);
    };
    qualityApi();
  }, []);

  // 日期
  const [date, setDate] = useState([]);
  // 空气质量指数
  const [qaqi, setAqi] = useState([]);
  // 空气质量指数等级
  const [qlevel, setLevel] = useState([]);
  // 空气质量程度
  const [cate, setCate] = useState([]);

  // 对获取的数据进行加工
  useEffect(() => {
    const changeData = (dataList) => {
      const arrDate = [];
      const arrAqi = [];
      const arrLevel = [];
      const arrCate = [];
      for (let i = 0; i < dataList.length; i++) {
        arrDate.push(dataList[i]["fxDate"]);
        arrAqi.push(dataList[i]["aqi"]);
        arrLevel.push(dataList[i]["level"]);
        // 对污染程度进行数据加工
        if (dataList[i]["category"] === "优") {
          arrCate.push(Math.floor(Math.random() * 51));
        } else if (dataList[i]["category"] === "良") {
          arrCate.push(Math.floor(Math.random() * 50) + 51);
        } else if (dataList[i]["category"] === "轻度污染") {
          arrCate.push(Math.floor(Math.random() * 50) + 101);
        } else if (dataList[i]["category"] === "中度污染") {
          arrCate.push(Math.floor(Math.random() * 50) + 151);
        }
      }
      setDate(arrDate);
      setAqi(arrAqi);
      setLevel(arrLevel);
      setCate(arrCate);
    };

    changeData(qualityList);
  }, [qualityList]);

  // 加载 eCharts
  const quality = useRef("");
  useEffect(() => {
    const chartDom = quality.current;
    const myChart = echarts.init(chartDom);
    let option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      legend: {
        data: ["空气质量指数级别", "空气质量指数", "空气质量指数等级"],
      },
      xAxis: [
        {
          type: "category",
          data: date,
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "空气质量指数",
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: "{value}",
          },
        },
        {
          // 空气质量指数等级
          type: "value",
          name: "空气质量指数等级",
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: "{value}",
          },
        },
      ],
      series: [
        {
          // 空气质量指数级别
          name: "空气质量指数级别",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              if (value > 0 && value < 51) {
                return `${value}(优)`;
              } else if ((value > 51) & (value < 101)) {
                return `${value}(良)`;
              } else if ((value > 101) & (value < 151)) {
                return `${value}(轻度污染)`;
              } else if ((value > 151) & (value < 201)) {
                return `${value}(中度污染)`;
              }
            },
          },
          data: cate,
        },
        {
          // 空气质量指数
          name: "空气质量指数",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return ` ${value}(PM2.5)`;
            },
          },
          data: qaqi,
        },
        {
          name: "空气质量指数等级",
          type: "line",
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value;
            },
          },
          data: qlevel,
        },
      ],
    };

    option && myChart.setOption(option);
  }, [date, qaqi, qlevel, cate]);

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        separator=">"
        items={[
          {
            title: "首页",
            href: "/",
          },
          {
            title: "空气质量预报",
          },
        ]}
      ></Breadcrumb>
      {/* 空气质量预报 */}
      <div ref={quality} style={{ width: 900, height: 500 }}></div>
    </>
  );
};

export default Qualityforecast;
