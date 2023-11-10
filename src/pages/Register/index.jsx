import { Button, Form, Input, Row, Col, Card, message } from "antd";

import UserRegister from "@/apis/UserRegister";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { RegisterUserName, RegisterUserPassword } = values;
    let data = {
      username: RegisterUserName,
      password: RegisterUserPassword,
    };
    // 调用 UserRegister 注册
    const UserRegisterApi = async () => {
      const result = await UserRegister(data);
      // 注册成功
      if (result) {
        message.success("用户注册成功,5秒后跳转到登录页");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        // 用户名已存在
        message.error("该用户已存在");
      }
    };
    UserRegisterApi();
  };
  // 表单重置
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={10}>
        <Card title="用户注册" extra={<a href="/login">登录</a>}>
          <Form
            name="register"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="RegisterUserName"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
                {
                  pattern: /^[a-zA-Z][a-zA-Z_\d]{2,7}$/,
                  message:
                    "用户名只能包括字母/下划线,只能字母开头,长度为3-8个字符",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="RegisterUserPassword"
              label="密码"
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="RegisterConfirmPassword"
              label="确认密码"
              dependencies={["RegisterUserPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "请输入确认密码",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("RegisterUserPassword") === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次密码输入不一致"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 10 }}
              className="btnAll"
              style={{ marginTop: 30 }}
            >
              <Button type="primary" htmlType="submit">
                注册
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
  );
};
export default Register;
