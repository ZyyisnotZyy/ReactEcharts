import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  InputNumber,
  message,
  Modal,
} from "antd";
import {
  PlusOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  SyncOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { AirqualityApi } from "@/apis/AirqualityApi";
import "./index.css";
const Airquality = () => {
  // api 数组列表
  const [apiList, setApiList] = useState([]);
  // 共享表单数据
  const [echartsName, setechartsName] = useState("");
  const [echartsValue, setechartsValue] = useState(0);
  // 解决表单 initialValues 无法动态更新的问题
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const { confirm } = Modal;

  // 实时空气质量 Api 接口
  useEffect(() => {
    const getAirApi = async () => {
      let obj = {
        location: 101180309,
        key: "d2b69ce32e614aa0a4a7e7ba2f09c157",
      };
      const result = await AirqualityApi(obj);
      setApiList(result.data.now);
    };
    getAirApi();
  }, []);

  // 对获取的 api 数据进行加工
  const { co, no2, so2, o3, pm2p5, pm10, aqi, category, pubTime } = apiList;
  // 饼图数据 ==> 数组化 方便后续管理操作
  const [pieData, setpieData] = useState([]);
  useEffect(() => {
    let arr = [
      { name: "一氧化碳", value: co },
      { name: "二氧化氮", value: no2 },
      { name: "二氧化硫", value: so2 },
      { name: "臭氧", value: o3 },
      { name: "PM2.5", value: pm2p5 },
      { name: "PM10", value: pm10 },
    ];
    setpieData(arr);
  }, [co, no2, so2, o3, pm2p5, pm10]);

  // 标题时间处理
  const date = new Date(pubTime);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const dateTime = `${year}年${month}月${day}日`;

  // 抽屉数据
  const [open, setOpen] = useState(false);

  // 饼图数据展示
  const airPie = useRef("");
  useEffect(() => {
    const chartDom = airPie.current;
    const myChart = echarts.init(chartDom);
    let option = {
      title: {
        text: "红旗区实时空气质量",
        subtext: `${dateTime}--空气指数${aqi}--${category}`,
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          name: "空气质量主要成分",
          type: "pie",
          radius: "50%",
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
    myChart.on("click", function (params) {
      // 打开抽屉
      setOpen(true);
      // 获取点击的数据 名字 值
      setechartsName(params.name);
      setechartsValue(params.value);
      // 解决 input 输入框不更新问题
      form.setFieldsValue({
        echartsName: params.name,
        echartsValue: params.value,
      });
    });
  }, [aqi, category, dateTime, form, pieData]);

  // 修改事件
  const onFinish = (values) => {
    // 判断点击图表数据和最终修改的表单数据是否一样
    if (
      echartsName === values.echartsName &&
      echartsValue === values.echartsValue
    ) {
      // 未作修改
      message.warning("数据未修改!!!");
    } else {
      // 进行修改
      const getItem = pieData.find((e) => e.name === values.echartsName);
      let filterData = pieData.filter((e) => e.name !== getItem.name);
      const { echartsValue } = form.getFieldsValue(["echartsValue"]);
      let finData = {
        name: getItem.name,
        value: echartsValue,
      };
      setpieData([...filterData, finData]);
      message.success(`修改${values.echartsName}为${values.echartsValue}!!!`);
      setOpen(false);
    }
  };

  // 取消事件
  const onClose = () => {
    message.info(`用户已取消!!!`);
    setOpen(false);
  };

  // 删除事件
  const onDele = () => {
    confirm({
      title: `确定删除${echartsName}`,
      icon: <ExclamationCircleFilled />,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        // 直接拿到点击图表共享数据 echartsName
        setpieData(pieData.filter((e) => e.name !== echartsName));
        message.success(`删除成功!`);
        setOpen(false);
      },
      onCancel() {
        message.info(`取消删除!!!`);
      },
    });
  };

  // 添加事件
  const onAdd = () => {
    // 打开对话框对 form 表单进行添加
    confirm({
      title: "添加图表数据",
      width: 550,
      content: (
        <Form
          name="addAirPie"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          form={form1}
        >
          <Form.Item name="addName" label={`图表名称`}>
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="addValue"
            label={`图表数据`}
            rules={[
              {
                validator: function (rule, value, callback) {
                  try {
                    if (Number(value) > 400) {
                      throw new Error("最大可输入值为 400");
                    }
                    if (!/^[1-9]+[0-9]*$/.test(value)) {
                      throw new Error("请输入正整数");
                    }
                    return Promise.resolve();
                  } catch (err) {
                    return Promise.reject(err);
                  }
                },
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      ),
      okText: "添加",
      okType: "primary",
      cancelText: "取消",
      onOk() {
        // 获取添加的 名称 数据
        const { addName, addValue } = form1.getFieldsValue([
          "addName",
          "addValue",
        ]);
        let addData = {
          name: addName,
          value: addValue,
        };
        // 添加图表 名称 数据
        setpieData([...pieData, addData]);
        message.success(`数据${addName}添加成功!!!`);
        setOpen(false);
        // 清空表单数据--防止再次添加还保留上次的数据
        form1.resetFields();
      },
      // 取消添加
      onCancel() {
        message.info(`取消添加!!!`);
      },
    });
  };
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
            title: "实时空气质量",
          },
        ]}
      ></Breadcrumb>

      {/* 饼图数据 */}
      <div ref={airPie} style={{ width: 500, height: 500 }}></div>
      {/* 抽屉表单 */}
      <>
        <Drawer
          title="编辑图表数据"
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button
                onClick={() => onAdd()}
                type="primary"
                icon={<PlusOutlined />}
              >
                添加
              </Button>
              <Button
                onClick={() => onDele()}
                type="primary"
                icon={<DeleteOutlined />}
              >
                删除
              </Button>
            </Space>
          }
        >
          <Form
            name="AirPie"
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            form={form}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="echartsName" label={echartsName}>
                  <Input autoComplete="false" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 20 }}>
              <Col span={12}>
                <Form.Item
                  name="echartsValue"
                  label={`${echartsName}值`}
                  rules={[
                    {
                      validator: function (rule, value, callback) {
                        try {
                          if (Number(value) > 400) {
                            throw new Error("最大可输入值为 400");
                          }
                          if (!/^[1-9]+[0-9]*$/.test(value)) {
                            throw new Error("请输入正整数");
                          }
                          return Promise.resolve();
                        } catch (err) {
                          return Promise.reject(err);
                        }
                      },
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Space size={"large"}>
                <Button
                  type="primary"
                  htmlType="subimt"
                  icon={<CheckCircleOutlined />}
                >
                  修改
                </Button>
                <Button onClick={() => onClose()} icon={<SyncOutlined />}>
                  取消
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    </>
  );
};
export default Airquality;
