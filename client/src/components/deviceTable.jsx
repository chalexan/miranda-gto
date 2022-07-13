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
} from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { copy } from "copy-to-clipboard";
import { getDevices, getTags, removeDeviceById } from "../lib/apiReq";
const DeviceTable = () => {
  const { Option } = Select;
  const [devices, setDevices] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
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
    {
      title: "Поставщик",
      dataIndex: "provider",
      ...getColumnSearchProps("provider"),
      key: "provider",
      sorter: (a, b) => a.provider.localeCompare(b.provider),
    },
    {
      title: "Ед. изм",
      dataIndex: "meter",
      key: "meter",
      sorter: (a, b) => a.meter.localeCompare(b.meter),
    },
    {
      title: "Количество",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Цена",
      dataIndex: "cost",
      key: "cost",
      sorter: (a, b) => a.cost.localeCompare(b.cost),
    },

    {
      title: "Действие",
      key: "more",
      render: (record) => (
        <>
          <a
            onClick={() => {
              localStorage.setItem("idDevice", record._id);
              localStorage.setItem("nameDevice", record.name);
              localStorage.setItem("nomposDevice", record.nompos);
              localStorage.setItem("providerDevice", record.provider);
              localStorage.setItem("meterDevice", record.meter);
              localStorage.setItem("countDevice", record.count);
              localStorage.setItem("molDevice", record.mol);
              localStorage.setItem("costDevice", record.cost);
              localStorage.setItem("categoryDevice", record.category);
              localStorage.setItem("descriptionDevice", record.description);
            }}
          >
            <Link to={`/device/${record._id}`}>Редактировать</Link>
          </a>
          <br />
          <a
            onClick={() => {
              removeOneDevice(record._id);
              window.location.reload();
            }}
          >
            Удалить
          </a>
        </>
      ),
      fixed: "right",
    },
  ];

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

  // получить все теги (категории)
  const getAllTags = async () => {
    const result = await getTags();
    if (result.code == 3) {
      setTags(result.data);
    } else {
      console.log("Error: ", result.data);
    }
  };

  // замена номеров категорий на названия
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

  useEffect(() => {
    getDevicesList();
    getAllTags();
  }, []);

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
                <Select mode="tags" style={{ width: 200 }} defaultValue={0}>
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
          </div>
          <Button type="primary" icon={<PlusCircleOutlined />}>
            Добавить
          </Button>
        </div>
        <Divider />
        <b>Всего номенклатур: {devices && devices.length}</b>
        <br />
        <Table columns={columns} dataSource={devices} />
      </Card>
    </>
  );
};

export default DeviceTable;
