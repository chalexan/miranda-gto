import { useEffect, useState } from "react";
import { Breadcrumb, Card, Button, Space, Form, Input, message } from "antd";
import { modifyPartners } from "../lib/apiReq";
import { Link } from "react-router-dom";
const PartnerCard = () => {
  const [currentPartner, setCurrentPartner] = useState([]);

  const onFinish = () => {
    const company = document.getElementById("input-company").value;
    const person = document.getElementById("input-person").value;
    const phone = document.getElementById("input-phone").value;
    const email = document.getElementById("input-email").value;
    const description = document.getElementById("input-description").value;

    console.log("Success:", {
      id: currentPartner.id,
      _id: currentPartner._id,
      company,
      person,
      phone,
      email,
      description,
    });

    modifyOnePartner({
      id: currentPartner.id,
      _id: currentPartner._id,
      company,
      person,
      phone,
      email,
      description,
    });
  };

  const getFromLocalStorage = () => {
    setCurrentPartner({
      id: localStorage.getItem("idPartner"),
      person: localStorage.getItem("personPartner"),
      company: localStorage.getItem("companyPartner"),
      email: localStorage.getItem("emailPartner"),
      phone: String(localStorage.getItem("phonePartner")),
      description: String(localStorage.getItem("descriptionPartner")),
    });
  };

  const modifyOnePartner = async (partner) => {
    const result = await modifyPartners(partner);
    if (result.code == 3) {
      console.log("Modify success: ", result);
      message.info("Редактирование успешно");
      window.location.href = "/partner";
    } else {
      console.log("Modify error: ", result.data);
      message.error("Ошибка сервера");
    }
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Миранда-медиа</Breadcrumb.Item>
        <Breadcrumb.Item>ГТО</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/partner">Партнёры</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {currentPartner && currentPartner.company}
        </Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card
        title={`Карточка партнёра: ${currentPartner && currentPartner.company}`}
      >
        {currentPartner && (
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
            autoComplete="off"
          >
            <Form.Item label="Компания" name="company">
              {currentPartner.company && (
                <Input
                  id="input-company"
                  defaultValue={currentPartner.company}
                />
              )}
            </Form.Item>

            <Form.Item label="Контактное лицо" name="person">
              {currentPartner.person && (
                <Input id="input-person" defaultValue={currentPartner.person} />
              )}
            </Form.Item>

            <Form.Item label="E-mail" name="email">
              {currentPartner.email && (
                <Input id="input-email" defaultValue={currentPartner.email} />
              )}
            </Form.Item>
            {console.log(currentPartner)}
            <Form.Item label="Телефон" name="phone">
              {currentPartner.phone && (
                <Input id="input-phone" defaultValue={currentPartner.phone} />
              )}
            </Form.Item>

            <Form.Item label="Дополнительно" name="description">
              {currentPartner.description && (
                <Input
                  id="input-description"
                  defaultValue={currentPartner.description}
                />
              )}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  onFinish();
                }}
              >
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </>
  );
};

export default PartnerCard;
