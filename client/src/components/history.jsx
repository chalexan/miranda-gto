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
import { getHistory } from "../lib/apiReq";
const History = () => {
  const { Option } = Select;
  const [history, setHistory] = useState([]);
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
      title: "Дата/время",
      dataIndex: "createdAt",
      ...getColumnSearchProps("createdAt"),
      key: "createdAt",
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: "Пользователь",
      dataIndex: "user",
      ...getColumnSearchProps("user"),
      key: "user",
      sorter: (a, b) => a.provider.localeCompare(b.provider),
    },
    {
      title: "Операция",
      dataIndex: "operation",
      key: "operation",
      sorter: (a, b) => a.operation - b.operation,
    },
    {
      title: "Описание действия",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
    },

    // {
    //   title: "Действие",
    //   key: "more",
    //   render: (record) => (
    //     <>
    //       <a
    //         onClick={() => {
    //           saveToLocalStorage(record);
    //         }}
    //       >
    //         <Link to={`/device/${record._id}`}>Редактировать</Link>
    //       </a>
    //       <br />
    //       <a
    //         onClick={() => {
    //           removeOneDevice(record._id);
    //           getDevicesList();
    //         }}
    //       >
    //         Удалить
    //       </a>
    //     </>
    //   ),
    //   fixed: "right",
    // },
  ];

  //получить список устройств
  const getHistoryList = async () => {
    setLoading(true);
    const result = await getHistory();
    if (result.code == 3) {
      console.log("Load success: ", result);
      setHistory(result.data);
    } else {
      console.log("Error: ", result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getHistoryList();
  }, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>История</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card title="История действий">
        <Table columns={columns} dataSource={history.reverse()} />
      </Card>
    </>
  );
};

export default History;
