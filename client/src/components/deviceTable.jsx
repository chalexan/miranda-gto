import { Breadcrumb, Card, Table, Select, Divider, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { copy } from "copy-to-clipboard";
const DeviceTable = () => {
  const { Option } = Select;
  const columns = [
    {
      title: "Наименование",
      dataIndex: "name",
      // ...getColumnSearchProps("cave_name"),
      key: "name",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Ном.позиция",
      dataIndex: "nompos",
      key: "nompos",
      sorter: (a, b) => a.nompos - b.nompos,
    },
    {
      title: "Поставщик",
      dataIndex: "provider",
      key: "provider",
      sorter: (a, b) => a.provider - b.provider,
    },
    {
      title: "Ед. изм",
      dataIndex: "meter",
      key: "meter",
      sorter: (a, b) => a.meter - b.meter,
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
      sorter: (a, b) => a.cost - b.cost,
    },

    {
      title: "Действие",
      key: "more",
      render: (record) => (
        <>
          <a
            onClick={() => {
              //
            }}
          >
            Подробнее
          </a>
          <br />
          <a
            onClick={() => {
              //
            }}
          >
            Редактирвать
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
        <Breadcrumb.Item>Склад</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card
        title="Оборудование на складах"
        extra={<a href="#">Обновить таблицу</a>}
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
              <Select style={{ width: 200 }} defaultValue={0}>
                <Option key={0} value={0}>
                  Все категории
                </Option>
                <Option key={1} value={"Коммутаторы доступа"}>
                  Коммутаторы доступа
                </Option>
                <Option key={2} value={"Коммутаторы агрегации"}>
                  Коммутаторы агрегации
                </Option>
                <Option key={3} value={"Оптические модули"}>
                  Оптические модули
                </Option>
              </Select>
            </span>
          </div>
          <Button type="primary" icon={<PlusCircleOutlined />}>
            Добавить
          </Button>
        </div>
        <Divider />
        <Table columns={columns} />
      </Card>
    </>
  );
};

export default DeviceTable;
