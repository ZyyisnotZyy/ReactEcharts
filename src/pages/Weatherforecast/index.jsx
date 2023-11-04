import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Breadcrumb } from "antd";
import { henWeatherF } from "@/apis/Weatherforecast";
// 郑州市每日天气预报 7 天
const Weatherforecast = () => {
  // 最终展示郑州市数据 数组
  const [zzList, setzzList] = useState([]);
  // 日期
  const [dateList, setdateList] = useState([]);
  // 异步请求郑州市天气数据
  const [henWeatherList, sethenWeatherList] = useState([]);
  useEffect(() => {
    const getWeather = async () => {
      let obj = {
        location: 101180101,
        key: "d2b69ce32e614aa0a4a7e7ba2f09c157",
      };
      const result = await henWeatherF(obj);
      sethenWeatherList(result.data.daily);
    };
    getWeather();
  }, []);

  // 防止无限循环
  useEffect(() => {
    // 天气数据转数组方法
    const sortData = (arrData) => {
      if (zzList.length !== 0) {
        return zzList;
      } else {
        // 温度数据
        const newData = [];
        // 日期数据
        const newDate = [];
        for (let i = 0; i < arrData.length; i++) {
          newData.push(parseInt(arrData[i]["tempMax"]));
          newDate.push(arrData[i]["fxDate"]);
        }
        // 使用 setzzList 来更新 zzList
        setzzList(newData);
        setdateList(newDate);
      }
    };
    sortData(henWeatherList);
  }, [henWeatherList, zzList]);

  // ====================分割线====================
  // 最终展示新乡市数据 数组
  const [xxList, setxxList] = useState([]);
  // 异步请求新乡市天气数据
  const [xxWeatherList, setxxWeatherList] = useState([]);
  useEffect(() => {
    const getWeather = async () => {
      let obj = {
        location: 101180301,
        key: "d2b69ce32e614aa0a4a7e7ba2f09c157",
      };
      const result = await henWeatherF(obj);
      setxxWeatherList(result.data.daily);
    };
    getWeather();
  }, []);

  // 防止无限循环
  useEffect(() => {
    // 天气数据转数组方法
    const sortData = (arrData) => {
      if (xxList.length !== 0) {
        return xxList;
      } else {
        // 温度数据
        const newData = [];
        // 日期数据
        for (let i = 0; i < arrData.length; i++) {
          newData.push(parseInt(arrData[i]["tempMax"]));
        }
        // 使用 setxxList 来更新 xxList
        setxxList(newData);
      }
    };
    sortData(xxWeatherList);
  }, [xxWeatherList, xxList]);

  // ====================分割线====================
  // 最终展示红旗区数据 数组
  const [hqList, sethqList] = useState([]);
  // 异步请求红旗区天气数据
  const [hqWeatherList, sethqWeatherList] = useState([]);
  const [hqpieList, sethqpieList] = useState([]);
  useEffect(() => {
    const getWeather = async () => {
      let obj = {
        location: 101180309,
        key: "d2b69ce32e614aa0a4a7e7ba2f09c157",
      };
      const result = await henWeatherF(obj);
      sethqWeatherList(result.data.daily);
    };
    getWeather();
  }, []);

  // 防止无限循环
  useEffect(() => {
    // 天气数据转数组方法
    const sortData = (arrData) => {
      if (hqList.length !== 0) {
        return hqList;
      } else {
        // 温度数据
        const newData = [];
        // 饼图数据
        const pieData = [];
        // 日期数据
        for (let i = 0; i < arrData.length; i++) {
          newData.push(parseInt(arrData[i]["tempMax"]));
          // 处理饼图数据
          //{ value: 40, name: 'rose 1' },
          pieData.push({
            value: parseInt(arrData[i]["tempMax"]),
            name: arrData[i]["fxDate"],
          });
        }
        // 使用 sethqList 来更新 hqList
        sethqList(newData);
        sethqpieList(pieData);
      }
    };
    sortData(hqWeatherList);
  }, [hqWeatherList, hqList]);

  // 天气预报图表展示
  const weather = useRef("");
  useEffect(() => {
    const chartDom = weather.current;
    const myChart = echarts.init(chartDom);
    let option = {
      color: ["#80FFA5", "#00DDFF", "#37A2FF"],
      title: {
        text: "每日天气预报",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["郑州市7日天气", "新乡市7日天气", "红旗区7日天气"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: dateList,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "郑州市7日天气",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(128, 255, 165)",
              },
              {
                offset: 1,
                color: "rgb(1, 191, 236)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: zzList,
        },
        {
          name: "新乡市7日天气",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(0, 221, 255)",
              },
              {
                offset: 1,
                color: "rgb(77, 119, 255)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: xxList,
        },
        {
          name: "红旗区7日天气",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(55, 162, 255)",
              },
              {
                offset: 1,
                color: "rgb(116, 21, 219)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: hqList,
        },
      ],
    };

    option && myChart.setOption(option);
  }, [zzList, dateList, xxList, hqList]);

  // 天气预报饼图展示
  const hqpie = useRef("");
  useEffect(() => {
    const chartDom = hqpie.current;
    const myChart = echarts.init(chartDom);
    let option = {
      title: {
        text: "红旗区天气分布",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} {c}℃",
      },
      legend: {
        top: "bottom",
      },
      toolbox: {
        show: true,
      },
      series: [
        {
          name: "红旗区天气分布",
          type: "pie",
          radius: [50, 250],
          center: ["50%", "50%"],
          label: {
            show: true,
            position: "inside",
            formatter: "{b} {c}℃",
          },
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: hqpieList,
        },
      ],
    };

    option && myChart.setOption(option);
  }, [hqpieList]);
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
            title: "每日天气预报",
          },
        ]}
      ></Breadcrumb>
      {/* eCharts 图表展示 每日天气预报 */}
      <div style={{ display: "flex" }}>
        <div ref={weather} style={{ width: 700, height: 500 }}></div>
        <div ref={hqpie} style={{ width: 500, height: 500 }}></div>
      </div>
    </>
  );
};

export default Weatherforecast;
