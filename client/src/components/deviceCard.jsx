import {
  Breadcrumb,
  Card,
  message,
  Form,
  Button,
  Input,
  Space,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { modifyDevices, getTags } from "../lib/apiReq";
import { EditOutlined } from "@ant-design/icons";
const DeviceCard = (props) => {
  const { Option } = Select;
  const [currentDevice, setCurrentDevice] = useState([]);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState(null);
  const [isEditTags, setIsEditTags] = useState(false);

  const onFinish = () => {
    const name = document.getElementById("input-name").value;
    const nompos = document.getElementById("input-nompos").value;
    const provider = document.getElementById("input-provider").value;
    const meter = document.getElementById("input-meter").value;
    const count = document.getElementById("input-count").value;
    const mol = document.getElementById("input-mol").value;
    const cost = document.getElementById("input-cost").value;
    const description = document.getElementById("input-description").value;
    const readyCategory = () => {
      if (category) {
        const filtered = category.filter((el) => el != null);
        return filtered.join(",");
      } else return "";
    };
    console.log("Success:", {
      _id: currentDevice._id,
      name,
      nompos,
      provider,
      meter,
      count,
      mol,
      cost,
      category: readyCategory(),
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
      category: readyCategory(),
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

  const getAllTags = async () => {
    const result = await getTags();
    if (result.code == 3) {
      console.log("Load success: ", result);
      setTags(result.data);
    } else {
      console.log("Error: ", result.data);
    }
  };

  // замена номеров категорий на названия
  const idToName = (id, tags) => {
    try {
      if (id) return tags && tags.filter((el) => el.idTag == id)[0].name;
      return "-";
    } catch (error) {
      console.log("Read error:", error);
    }
  };

  useEffect(() => {
    getFromLocalStorage();
    getAllTags();
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
              {currentDevice.category && (
                <>
                  {currentDevice.category.split(",").map((el) =>
                    !isEditTags ? (
                      <Space>
                        <span key={el}>{idToName(el, tags)} </span>
                        <span> </span>
                      </Space>
                    ) : null
                  )}
                </>
              )}
              {!isEditTags && (
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => setIsEditTags(true)}
                />
              )}
              {isEditTags && (
                <Select
                  id="input-category"
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Выберите из списка"
                  defaultValue={currentDevice.category.split(",").map((el) => (
                    <Option key={idToName(el, tags)} value={idToName(el, tags)}>
                      {idToName(el, tags)}
                    </Option>
                  ))}
                  onChange={(e) => setCategory(e)}
                >
                  {tags.map((el) => (
                    <Option key={el.idTag} value={el.idTag}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
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
