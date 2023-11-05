import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Button, Card, Form, Input, message } from "antd";
import { setStorage } from "@/utils/index";
import { setUserInfo, setUserToken } from "@/store/modules/user";
import UserLogin from "@/apis/UserLogin";
import AuthorityApi from "@/apis/AuthorityApi";
import "./index.css";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // redux 中的 UserInfo
  const dispatch = useDispatch();

  // 用户登录
  const onFinish = (values) => {
    // 这里重写路由权限
    const AuthFn = async () => {
      //	表单中获取 username password
      const { username, password } = values;
      let personInfo = {
        username,
        password,
      };
      const resultLogin = await UserLogin(personInfo);
      if (resultLogin) {
        var userToken = resultLogin.data.data.token;
      }
      let endData = {
        username,
        password,
        userToken,
      };
      const resultAuthority = await AuthorityApi(endData, userToken);
      if (resultLogin && resultAuthority) {
        const { username, password, userToken } = resultAuthority.data.msg;
        // 设置 localStorage 存储 token
        setStorage("userToken", userToken);
        // 调用 dispatch 存入 用户名 密码
        dispatch(setUserInfo({ username, password }));
        // react-redux 调用 dispatch 存入 token
        dispatch(setUserToken(userToken));
        message.success("登陆成功");
        navigate("/");
      } else {
        message.error("用户名或密码错误");
      }
    };
    AuthFn();
  };

  // 表单重置
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col span={10}>
          <Card title="用户登录" extra={<a href="/register">去注册</a>}>
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
