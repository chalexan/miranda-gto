import { Breadcrumb, Card, Table } from "antd";
import { Link } from "react-router-dom";
const DeviceSearch = () => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/device/table">Склад</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Поиск оборудования</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card title="Поиск оборудования"></Card>
    </>
  );
};

export default DeviceSearch;
