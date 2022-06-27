import { Breadcrumb, Card, Table } from "antd";
import { Link } from "react-router-dom";
const DeviceCard = (props) => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/device/table">Склад</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Карточка оборудования - {props.name}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card title="Карточка оборудования - {props.name}"></Card>
    </>
  );
};

export default DeviceCard;
