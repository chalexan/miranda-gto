import { Breadcrumb, Card, message, Form, Button, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { modifyDevices } from "../lib/apiReq";
const DeviceCard = (props) => {
  const [currentDevice, setCurrentDevice] = useState([]);

  const onFinish = () => {
    const name = document.getElementById("input-name").value;
    const nompos = document.getElementById("input-nompos").value;
    const provider = document.getElementById("input-provider").value;
    const meter = document.getElementById("input-meter").value;
    const count = document.getElementById("input-count").value;
    const mol = document.getElementById("input-mol").value;
    const cost = document.getElementById("input-cost").value;
    const category = document.getElementById("input-category").value;
    const description = document.getElementById("input-description").value;

    console.log("Success:", {
      _id: currentDevice._id,
      name,
      nompos,
      provider,
      meter,
      count,
      mol,
      cost,
      category,
      description,
    });

    modifyOneDevice({
      _id: currentDevice._id,
      name,
      nompos,
      provider,
      meter,
      count,
      mol,
      cost,
      category,
      description,
    });
  };
  const getFromLocalStorage = () => {
    setCurrentDevice({
      _id: localStorage.getItem("idDevice"),
      name: localStorage.getItem("nameDevice"),
      nompos: localStorage.getItem("nomposDevice"),
      provider: localStorage.getItem("providerDevice"),
      meter: localStorage.getItem("meterDevice"),
      count: localStorage.getItem("countDevice"),
      mol: localStorage.getItem("molDevice"),
      cost: localStorage.getItem("costDevice"),
      category: localStorage.getItem("categoryDevice"),
      description: localStorage.getItem("descriptionDevice"),
    });
  };

  const modifyOneDevice = async (device) => {
    const result = await modifyDevices(device);
    if (result.code == 3) {
      message.info("Редактирование успешно");
      console.log("Modify success: ", result);
      window.location.href = "/device/table";
    } else {
      console.log("Modify error: ", result.data);
      message.error("Ошибка сервера");
    }
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/device/table">Склад</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{currentDevice && currentDevice.name}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card
        title={`Карточка оборудования: ${currentDevice && currentDevice.name}`}
      >
        {" "}
        {currentDevice && (
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
            autoComplete="off"
          >
            <Form.Item label="Номенклатурная позиция" name="nompos">
              {currentDevice.nompos && (
                <Input id="input-nompos" defaultValue={currentDevice.nompos} />
              )}
            </Form.Item>

            <Form.Item label="Название" name="name">
              {currentDevice.name && (
                <Input id="input-name" defaultValue={currentDevice.name} />
              )}
            </Form.Item>

            <Form.Item label="Поставщик" name="provider">
              {currentDevice.name && (
                <Input
                  id="input-provider"
                  defaultValue={currentDevice.provider}
                />
              )}
            </Form.Item>
            {console.log(currentDevice)}
            <Form.Item label="Единица измерения" name="meter">
              {currentDevice.meter && (
                <Input id="input-meter" defaultValue={currentDevice.meter} />
              )}
            </Form.Item>

            <Form.Item label="Количество" name="count">
              {currentDevice.count && (
                <Input id="input-count" defaultValue={currentDevice.count} />
              )}
            </Form.Item>

            <Form.Item label="МОЛ" name="mol">
              {currentDevice.mol && (
                <Input id="input-mol" defaultValue={currentDevice.mol} />
              )}
            </Form.Item>

            <Form.Item label="Цена" name="cost">
              {currentDevice.cost && (
                <Input id="input-cost" defaultValue={currentDevice.cost} />
              )}
            </Form.Item>

            <Form.Item label="Категория" name="category">
              {currentDevice.name && (
                <Input
                  id="input-category"
                  defaultValue={currentDevice.category}
                />
              )}
            </Form.Item>

            <Form.Item label="Дополнительно" name="description">
              {currentDevice.cost && (
                <Input
                  id="input-description"
                  defaultValue={currentDevice.description}
                />
              )}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    onFinish();
                  }}
                >
                  Сохранить
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    //
                  }}
                >
                  Выдача
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    //
                  }}
                >
                  Получение
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Card>
    </>
  );
};

export default DeviceCard;
