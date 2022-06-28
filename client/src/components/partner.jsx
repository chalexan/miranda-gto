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
import {
  PlusCircleOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import copy from "copy-to-clipboard";
import { getPartners, savePartners, removePartnersById } from "../lib/apiReq";
import { useEffect, useState } from "react";

const Partner = () => {
  const [newPartnerModalVis, setNewPartnerModalVis] = useState(false);
  const [partners, setPartners] = useState([]);
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
    saveNewPartner(values);
    setNewPartnerModalVis(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setNewPartnerModalVis(false);
  };

  const getPartnersList = async () => {
    setLoading(true);
    const result = await getPartners();
    if (result.code == 3) {
      console.log("Load success: ", result);
      setPartners(result.data);
    } else {
      console.log("Error: ", result.data);
    }
    setLoading(false);
  };

  const saveNewPartner = async (data) => {
    await savePartners(data);
    return await getPartnersList();
  };

  const removeOnePartner = async (id) => {
    const result = await removePartnersById(id);
    if (result.code == 3) {
      console.log("Delete success: ", result);
      message.info("Удаление успешно проведено");
    } else {
      console.log("Error: ", result.data);
      message.info(`Ошибка удаления: ${result.data}`);
    }
  };

  useEffect(() => {
    getPartnersList();
  }, []);

  const columns = [
    {
      title: "Компания",
      dataIndex: "company",
      ...getColumnSearchProps("company"),
      key: "company",
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: "Контактное лицо",
      dataIndex: "person",
      ...getColumnSearchProps("person"),
      key: "person",
      sorter: (a, b) => a.person.localeCompare(b.person),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
      key: "provider",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
      key: "meter",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Действие",
      key: "more",
      render: (record) => (
        <>
          <a
            onClick={() => {
              localStorage.setItem("idPartner", record.id);
              localStorage.setItem("personPartner", record.person);
              localStorage.setItem("companyPartner", record.company);
              localStorage.setItem("emailPartner", record.email);
              localStorage.setItem("phonePartner", record.phone);
              localStorage.setItem(
                "descriptionPartner",
                String(record.description) ? String(record.description) : "-"
              );
            }}
          >
            <Link to={`/partner/${record.id}`}>Редактировать</Link>
          </a>
          <br />
          <a
            onClick={() => {
              copy(`${record.company} \n ${record.email}`);
              message.info("Контакты скопированы");
            }}
          >
            Скопировать
          </a>
          <br />
          <a
            onClick={() => {
              removeOnePartner(record.id);
              getPartnersList();
            }}
          >
            Удалить
          </a>
        </>
      ),
      fixed: "right",
    },
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>Партнёры</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card
        loading={loading}
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => setNewPartnerModalVis(true)}
              icon={<PlusCircleOutlined />}
            >
              Добавить
            </Button>
            <a onClick={() => getPartnersList()}>Обновить таблицу</a>
          </Space>
        }
        title="Контакты партнеров"
      >
        <Table columns={columns} dataSource={partners} />
      </Card>

      {/* Add partner modal window */}

      <Modal
        visible={newPartnerModalVis}
        title="Новый партнёр"
        footer={[]}
        onCancel={() => setNewPartnerModalVis(false)}
        onOk={() => setNewPartnerModalVis(false)}
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

export default Partner;
