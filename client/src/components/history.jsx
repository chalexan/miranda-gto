import { Breadcrumb, Card, Table } from "antd";
import { Link } from "react-router-dom";
const History = () => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>История</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card title="История действий"></Card>
    </>
  );
};

export default History;
