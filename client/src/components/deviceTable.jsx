import {
  Breadcrumb,
  Card,
  Table,
  Select,
  Divider,
  Button,
  Input,
  Space,
  message,
  Tag,
  Modal,
  Form,
} from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import {
  getDevices,
  getTags,
  removeDeviceById,
  saveNewDevice,
} from "../lib/apiReq";
const DeviceTable = () => {
  const { Option } = Select;

  const [devices, setDevices] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newDeviceModalVis, setNewDeviceModalVis] = useState(false);
  const [searchedTags, setSearchedTags] = useState([]);

  // Поиск по колонке
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  let searchInput;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Введите запрос`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters);
              handleSearch(selectedKeys, confirm, dataIndex);
              handleReset(clearFilters);
            }}
            size="small"
            style={{ width: 90 }}
          >
            Сброс
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            -
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  // Конец поиска по колонке

  const columns = [
    {
      title: "Наименование",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Категории",
      key: "category",
      render: (record) => {
        return (
          record.category &&
          record.category
            .split(",")
            .map((el) => <Tag color="orange">{idToName(el, tags)}</Tag>)
        );
      },
    },
    // {
    //   title: "Производитель",
    //   dataIndex: "provider",
    //   ...getColumnSearchProps("provider"),
    //   key: "provider",
    //   sorter: (a, b) => a.provider.localeCompare(b.provider),
    // },
    // {
    //   title: "Ед. изм",
    //   dataIndex: "meter",
    //   key: "meter",
    //   sorter: (a, b) => a.meter.localeCompare(b.meter),
    // },
    {
      title: "Кол-во",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Склад",
      dataIndex: "storageName",
      key: "storageName",
      sorter: (a, b) => a.cost.localeCompare(b.cost),
    },
    {
      title: "Место",
      dataIndex: "storagePlace",
      key: "storagePlace",
      sorter: (a, b) => a.cost.localeCompare(b.cost),
    },
    {
      title: "Действие",
      key: "more",
      render: (record) => (
        <>
          <a
            onClick={() => {
              saveToLocalStorage(record);
            }}
          >
            <Link to={`/device/${record._id}`}>Редактировать</Link>
          </a>
          <br />
          <a
            onClick={() => {
              removeOneDevice(record._id);
              getDevicesList();
            }}
          >
            Удалить
          </a>
        </>
      ),
      fixed: "right",
    },
  ];

  //получить список устройств
  const getDevicesList = async () => {
    setLoading(true);
    const result = await getDevices();
    if (result.code == 3) {
      console.log("Load success: ", result);
      setDevices(result.data);
    } else {
      console.log("Error: ", result.data);
    }
    setLoading(false);
  };

  //удаление оборудования
  const removeOneDevice = async (id) => {
    const result = await removeDeviceById(id);
    if (result.code == 3) {
      console.log("Delete success: ", result);
      message.info("Удаление успешно проведено");
    } else {
      console.log("Error: ", result.data);
      message.info(`Ошибка удаления: ${result.data}`);
    }
  };

  //получить все теги (категории)
  const getAllTags = async () => {
    const result = await getTags();
    if (result.code == 3) {
      setTags(result.data);
    } else {
      console.log("Error: ", result.data);
    }
  };

  //замена номеров категорий на названия
  const idToName = (id, tags) => {
    let temp;
    try {
      if (id)
        return (temp = tags && tags.filter((el) => el.idTag == id)[0].name);
      return "-";
    } catch (error) {
      console.log("Read error:", error);
    }
  };

  //сохранение в локальном хранилище
  const saveToLocalStorage = (rec) => {
    const {
      _id,
      name,
      nompos,
      provider,
      meter,
      count,
      mol,
      cost,
      category,
      description,
      storageName,
      storagePlace,
    } = rec;
    const currentDevice = [
      { fieldName: "idDevice", fieldValue: _id },
      { fieldName: "nameDevice", fieldValue: name },
      { fieldName: "nomposDevice", fieldValue: nompos },
      { fieldName: "providerDevice", fieldValue: provider },
      { fieldName: "meterDevice", fieldValue: meter },
      { fieldName: "countDevice", fieldValue: count },
      { fieldName: "molDevice", fieldValue: mol },
      { fieldName: "costDevice", fieldValue: cost },
      { fieldName: "categoryDevice", fieldValue: category },
      { fieldName: "descriptionDevice", fieldValue: description },
      { fieldName: "storageNameDevice", fieldValue: storageName },
      { fieldName: "storagePlaceDevice", fieldValue: storagePlace },
    ];
    return currentDevice.map((device) =>
      localStorage.setItem(device.fieldName, device.fieldValue)
    );
  };

  //поиск по категориям (тегам)
  const searchByTags = (tagsArray, devices) => {
    if (tagsArray.length === 0)
      return console.log("Search request [tags] finish - error: no tags");
    const filtered = devices.filter((device) =>
      tagsArray
        .map((el) => String(el))
        .every((ai) => device.category.split(",").includes(ai))
    );
    return filtered;
  };

  useEffect(() => {
    getDevicesList();
    getAllTags();
  }, []);

  const onFinish = async (values) => {
    console.log("Success:", values);
    await saveNewDevice(values);
    setNewDeviceModalVis(false);
    return await getDevicesList();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setNewDeviceModalVis(false);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>Склад</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card
        title="Оборудование на складах"
        loading={loading}
        extra={<a onClick={() => getDevicesList()}>Обновить таблицу</a>}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span>Категория оборудования: </span>
            <span>
              {tags && (
                <Select
                  mode="tags"
                  onChange={(e) => setSearchedTags(e)}
                  style={{ width: 200 }}
                >
                  {tags.map((el) => (
                    <>
                      {console.log(el)}
                      <Option key={el.idTag} value={el.idTag}>
                        {el.name}
                      </Option>
                    </>
                  ))}
                </Select>
              )}
            </span>
            <span> </span>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => setDevices(searchByTags(searchedTags, devices))}
            />
            <span> </span>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => getDevicesList()}
            />
          </div>
          <Button
            type="primary"
            onClick={() => setNewDeviceModalVis(true)}
            icon={<PlusCircleOutlined />}
          >
            Добавить
          </Button>
        </div>
        <Divider />
        <b>Всего номенклатур: {devices && devices.length}</b>
        <br />
        <Table columns={columns} dataSource={devices.reverse()} />
      </Card>

      {/* Add device modal window */}

      <Modal
        visible={newDeviceModalVis}
        title="Добавить оборудование"
        footer={[]}
        onCancel={() => setNewDeviceModalVis(false)}
        onOk={() => setNewDeviceModalVis(false)}
      >
        <Card>
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
              label="Наименование"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Введите название оборудования!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Номенклатура" name="namepos">
              <Input defaultValue="0000-000" />
            </Form.Item>

            <Form.Item label="Cклад" name="storageName">
              <Input defaultValue="Склад-2" />
            </Form.Item>

            <Form.Item label="Место" name="storagePlace">
              <Input defaultValue="" />
            </Form.Item>

            <Form.Item label="Производитель" name="provider">
              <Input />
            </Form.Item>

            <Form.Item label="Категория" name="category">
              <Select
                id="input-category"
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Выберите из списка"
                // onChange={(e) => setCategory(e)}
              >
                {tags.map((el) => (
                  <Option key={el.idTag} value={el.idTag}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Количество" name="count">
              <Input defaultValue={0} />
            </Form.Item>

            <Form.Item label="Единица измерения" name="meter">
              <Input defaultValue="шт" />
            </Form.Item>

            <Form.Item label="МОЛ" name="mol">
              <Input />
            </Form.Item>

            <Form.Item label="Цена" name="cost">
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default DeviceTable;
