// cрочно - таблица получения на склад - начато 3 августа - закончить до 8 августа
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
import { getDevices, saveToHistory, purchaseGiveAway } from "../lib/apiReq";
import { str_rand } from "../lib/func";
import TextArea from "antd/lib/input/TextArea";
const ReceiveDeviceTable = () => {
  const { Option } = Select;
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [additionModal, setAdditionModal] = useState(false);
  const [strRand, setStrRand] = useState("");
  const [addDeviceModalVis, setAddDeviceModalVis] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(null);
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
      title: "Название",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Действие",
      key: "more",
      render: (record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setCurrentDevice(record);
              setAdditionModal(true);

              console.log(`Device ${record.name} add to Order Modal vindow`);
            }}
          >
            Выбрать
          </Button>
          {/* Модалка с указанием данных единицы оборудования для получения */}
          <Modal
            visible={additionModal}
            title="Данные получаемого оборудования"
            onCancel={() => setAdditionModal(false)}
            onOk={() => {
              setOrderList((prev) => [
                ...prev,
                { device: record, count: countReq },
              ]);
              setAdditionModal(false);
            }}
          >
            <Form
              name="purchase"
              autoComplete="off"
              onFinish={onFinishDeviceAttributes}
              onFinishFailed={onFinishFailed}
              initialValues={
                {
                  // idDevice: currentDevice && currentDevice.id,
                }
              }
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
            >
              <Form.Item name="nameDevice" label="Название" key={0}>
                {currentDevice && currentDevice.name}
              </Form.Item>
              <Form.Item name="idDevice" label="UID" key={-1}>
                {currentDevice && currentDevice._id}
              </Form.Item>
              <Form.Item name="count" label="Кол-во" key={1}>
                <Input type="number" />
              </Form.Item>
              <Form.Item name="storageName" label="Склад" key={2}>
                <Select />
              </Form.Item>
              <Form.Item name="storagePlace" label="Место" key={3}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Провести
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      ),
    },
  ];
  const orderColumns = [
    {
      title: "Название",
      render: (record) => <b>{record.device.name}</b>,
      key: "01",
    },
    {
      title: "Кол-во",
      dataIndex: "count",
      key: "02",
      sorter: (a, b) => a < b,
    },
    {
      title: "Действие",
      key: "03",
      render: (record) => (
        <Button
          icon={<DeleteOutlined />}
          type="primary"
          onClick={() => {
            deleteDevice(record.device._id, record.device.count);
          }}
        />
      ),
    },
  ];
  //удаление из таблицы получения
  const deleteDevice = (deviceId, deviceCount) => {
    setPurchaseList(purchaseList.filter((dev) => dev.device._id !== deviceId));
    setDevices(
      devices.map((dev) =>
        dev._id === deviceId ? { ...dev, count: deviceCount } : dev
      )
    );
  };
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
  // если успешно - добавить с массив выдачи
  const onFinishDeviceAttributes = (values) => {};
  // если не успешно
  const onFinishFailed = (errorMsg) => {
    console.log("Error:", errorMsg);
  };
  useEffect(() => {
    getDevicesList();
    setStrRand(str_rand());
  }, []);
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>Получение</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card
        title={`Получение оборудования`}
        loading={loading}
        extra={
          <a onClick={() => setAddDeviceModalVis(true)}>Добавить оборудоване</a>
        }
      >
        {/* таблица заявки на получение */}
        <Form
          name="order"
          autoComplete="off"
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          initialValues={{
            nameUser: sessionStorage.getItem("login"),
            idUnique: strRand,
            mol: "",
            sender: "",
            description: "",
          }}
        >
          <Form.Item
            label="Дата документа (УИД): "
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            name="idUnique"
          >
            {new Date(Date.now()).toLocaleString().split(",")[0] +
              `(${strRand})`}
          </Form.Item>
          <Form.Item
            label="Сотрудник ГТО: "
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            name="nameUser"
          >
            {sessionStorage.getItem("login")}
          </Form.Item>
          <Form.Item
            label="Отправитель: "
            name="sender"
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="МОЛ: "
            name="mol"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Дополнительно: "
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            name="description"
          >
            <TextArea />
          </Form.Item>
          {orderList.length > 0 && (
            <>
              <Form.Item name="orderTable">
                <Table
                  columns={orderColumns}
                  key="0"
                  dataSource={orderList}
                  loading={loading}
                  pagination={{
                    defaultPageSize: 100,
                    showSizeChanger: false,
                    pageSizeOptions: ["10", "20", "30"],
                  }}
                  expandable={{
                    expandedRowRender: (record) => (
                      <>
                        <p style={{ margin: 0 }}>
                          <b>Номенклатура: </b>
                          {record.device.nompos}
                        </p>
                        <p style={{ margin: 0 }}>
                          <b>Цена: </b>
                          {record.device.cost} руб
                        </p>
                        <p style={{ margin: 0 }}>
                          <b>Склад: </b>
                          {record.device.storageName}
                        </p>
                        <p style={{ margin: 0 }}>
                          <b>Место: </b>
                          {record.device.storagePlace}
                        </p>
                        <p style={{ margin: 0 }}>
                          <b>МОЛ: </b>
                          {record.device.mol}
                        </p>
                        <p style={{ margin: 0 }}>
                          <b>Дополнительно: </b>
                          {record.device.description && "-"}
                        </p>
                      </>
                    ),
                  }}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Принять
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
        <Modal
          visible={addDeviceModalVis}
          title="Выберите оборудование"
          footer={[]}
          onCancel={() => setAddDeviceModalVis(false)}
          onOk={() => setAddDeviceModalVis(false)}
          width={800}
        >
          <Card>
            <Form name="basi" autoComplete="off">
              <Form.Item>
                <Table
                  columns={columns}
                  dataSource={devices}
                  loading={loading}
                  pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: false,
                    pageSizeOptions: ["10", "20", "30"],
                  }}
                  rowClassName={(record, i) =>
                    record.count === 0 ? "color-red" : null
                  }
                />
              </Form.Item>
            </Form>
          </Card>
        </Modal>
      </Card>
    </>
  );
};

export default ReceiveDeviceTable;
