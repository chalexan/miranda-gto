// cрочно - таблица выдачи/заявка на выдачу - начато 22 июля - закончить до 8 июля
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
const GiveAwayTable = () => {
  const { Option } = Select;
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [strRand, setStrRand] = useState("");
  const [addDeviceModalVis, setAddDeviceModalVis] = useState(false);
  const [purchaseList, setPurchaseList] = useState([]);

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
      title: "Кол-во",
      dataIndex: "count",
      ...getColumnSearchProps("count"),
      key: "count",
      sorter: (a, b) => a.count.localeCompare(b.count),
    },
    {
      title: "Действие",
      key: "more",
      render: (record) =>
        record.count > 0 && (
          <Button
            type="primary"
            onClick={() => {
              const countReq = prompt("Введите количество:", "1");
              if (+countReq === 0)
                return message.error("Невозможно выдать 0 единиц");

              if (+countReq > +record.count) {
                return message.error("Недостаточно оборудования на складе");
              }
              setPurchaseList((prev) => [
                ...prev,
                { device: record, count: countReq },
              ]);
              setDevices((prevState) =>
                prevState.map((item) =>
                  item._id === record._id
                    ? { ...item, count: item.count - countReq }
                    : item
                )
              );
              console.log(
                `Device ${record.name} x ${countReq} pcs add to Purchase List`
              );
            }}
          >
            Выбрать
          </Button>
        ),
      fixed: "right",
    },
  ];

  const purchaseColumns = [
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

  //удаление из таблицы выдачи
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

  // если успешно - отправка заявки на сервер
  const onFinish = (values) => {
    const modifyPurchaseList = purchaseList.map((el) => ({
      count: el.count,
      idDevice: el.device._id,
    }));
    const purchase = { purchase: modifyPurchaseList, values };
    console.log("Purchase ready to send:", purchase);
    const checkConfirm = confirm(
      `Внимание! Операция необратимая.\nБудут затронуты данные по ${modifyPurchaseList.length} позициям на складе. \nДействие будет сохранено в истории. \n\nВыполнить проводку?`
    );
    if (checkConfirm === true) {
      const purchaseStatus = purchaseGiveAway(purchase);
      // saveToHistory - реализовано на бэкенде
      window.location = "/";
    }
  };

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
        <Breadcrumb.Item>Выдача</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card
        title={`Выдача оборудования`}
        loading={loading}
        extra={
          <a onClick={() => setAddDeviceModalVis(true)}>Добавить оборудоване</a>
        }
      >
        {/* таблица заявки на выдачу */}
        <Form
          name="purchase"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            nameUser: sessionStorage.getItem("login"),
            idUnique: strRand,
            mol: "",
            installationAdress: "",
            recepientName: "",
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
            label="Получатель: "
            name="recepientName"
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
            label="Адрес установки: "
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            name="installationAdress"
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
          {purchaseList.length > 0 && (
            <>
              <Form.Item name="purchase">
                <Table
                  columns={purchaseColumns}
                  key="0"
                  dataSource={purchaseList}
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
                  Провести
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
        <Modal
          visible={addDeviceModalVis}
          title="Доступно к выдаче"
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

export default GiveAwayTable;
