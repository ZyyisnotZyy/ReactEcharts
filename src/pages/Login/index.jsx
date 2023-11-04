import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Button, Card, Form, Input, message } from "antd";
import { setStorage, getStorage } from "@/utils/index";
import { setUserInfo, setUserToken } from "@/store/modules/user";
import UserLogin from "@/apis/UserLogin";
import "./index.css";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // redux 中的 UserInfo
  const dispatch = useDispatch();
  // 获取当前 Url 路径
  const location = useLocation();
  // 判断如果当前路径是 /login 并且还有 token 就直接跳转到 / 首页
  if (location.pathname === "/login" && getStorage("userToken")) {
    return <Navigate to="/" replace />;
  }
  // 用户登录
  const onFinish = (values) => {
    const { username, password } = values;
    let personInfo = {
      username,
      password,
    };
    const getUser = async () => {
      const result = await UserLogin(personInfo);
      if (result) {
        message.success("登陆成功");
        // 设置 localStorage 存储 token
        setStorage("userToken", result.data.data.token);
        navigate("/");
        // 调用 dispatch 存入 用户名 密码
        dispatch(setUserInfo(values));
        // 调用 dispatch 存入 token
        dispatch(setUserToken(getStorage("userToken")));
      } else {
        message.error("用户名或密码不存在");
      }
    };
    getUser();
  };
  // 表单重置
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col span={10}>
          <Card title="用户登录" extra="去注册">
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
              className="home_form"
            >
              <Form.Item
                label="账号"
                name="username"
                rules={[{ required: true, message: "账号不能为空" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: "密码为空" }]}
                style={{ marginTop: 30 }}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{ offset: 10 }}
                className="btnAll"
                style={{ marginTop: 30 }}
              >
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Button
                  htmlType="button"
                  onClick={onReset}
                  style={{ marginLeft: 50 }}
                >
                  重置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
