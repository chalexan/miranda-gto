// список документов - в работе от 15 июля
// срочно закончить до 8 июля

import {
  Breadcrumb,
  Card,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Table,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import copy from "copy-to-clipboard";
import { getPartners, removePartnersById } from "../lib/apiReq";
import { useEffect, useState } from "react";

const DocumentTable = () => {
  const [newDeviceModalVis, setNewDeviceModalVis] = useState(false);
  const [documents, setDocuments] = useState([]);
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

  const onFinish = (values) => {
    console.log("Success:", values);
    // saveNewPartner(values);
    // setNewDeviceModalVis(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    // setNewDeviceModalVis(false);
  };

  const getDocumentList = async () => {
    // setLoading(true);
    // const result = await getPartners();
    // if (result.code == 3) {
    //   console.log("Load success: ", result);
    //   setDocuments(result.data);
    // } else {
    //   console.log("Error: ", result.data);
    // }
    // setLoading(false);
  };

  const saveNewDocument = async (data) => {
    // await savePartners(data);
    // return await getPartnersList();
  };

  const removeOneDocument = async (id) => {
    // const result = await removePartnersById(id);
    // if (result.code == 3) {
    //   console.log("Delete success: ", result);
    //   message.info("Удаление успешно проведено");
    // } else {
    //   console.log("Error: ", result.data);
    //   message.info(`Ошибка удаления: ${result.data}`);
    // }
  };

  useEffect(() => {
    getDocumentList();
  }, []);

  const columns = [
    {
      title: "Создатель",
      dataIndex: "company",
      ...getColumnSearchProps("company"),
      key: "company",
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: "Название",
      dataIndex: "person",
      ...getColumnSearchProps("person"),
      key: "person",
      sorter: (a, b) => a.person.localeCompare(b.person),
    },
    {
      title: "Ссылка на файл",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
      key: "provider",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Связано с",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
      key: "meter",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Примечание",
      key: "more",
    },
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>Документы</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card
        loading={loading}
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => setNewDeviceModalVis(true)}
              icon={<PlusCircleOutlined />}
            >
              Добавить
            </Button>
            <a onClick={() => getDocumentList()}>Обновить таблицу</a>
          </Space>
        }
        title="Документы и файлы"
      >
        <Table columns={columns} dataSource={documents} />
      </Card>

      {/* Add new document window */}

      <Modal
        visible={newDeviceModalVis}
        title="Новый документ"
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
              label="Компания"
              name="company"
              rules={[
                {
                  required: true,
                  message: "Введите название компании!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Контактное лицо" name="person">
              <Input />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Введите e-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Телефон" name="phone">
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

export default DocumentTable;
