import { Breadcrumb, Card, message } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { loginReq } from "../lib/apiReq";

const SignInPage = () => {
  const onFinish = async (values) => {
    console.log("Success:", values);
    const { code, data } = await tryAuth(values);

    if (code !== 3) {
      sessionStorage.removeItem("isLogin");
      message.error(data && `Ошибка доступа: ${data}`);
    } else {
      await message.success(data && `Доступ предоставлен: ${data.login}`);
      await message.info("Открываем систему. Переадресация.");
      sessionStorage.setItem("isLogin", true);
      sessionStorage.setItem("login", data.login);
      window.location = "/";
    }
    return 0;
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const tryAuth = async (values) => {
    const result = await loginReq(values);
    console.log("tryAuthResult->", result);
    return result;
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>Войти в систему</Breadcrumb.Item>
      </Breadcrumb>
      <br />

      <Card title="Вход">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[
              {
                required: true,
                message: "Введите имя пользователя!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: "Введите пароль!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SignInPage;
