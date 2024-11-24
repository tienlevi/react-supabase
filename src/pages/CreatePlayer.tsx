import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { addPlayer } from "../services/player";
import useMessage from "antd/es/message/useMessage";
import { getClubs } from "../services/club";
import { Club } from "../interface";

type FieldType = {
  name?: string;
  price?: number;
  club: string;
};

const CreatePlayer = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [message, contextHolder] = useMessage();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response = await addPlayer(values);

    if (response?.status !== 201) {
      return message.error("Add error");
    }
    return message.success("Add success");
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    (async () => {
      const response = await getClubs();
      setClubs(response as []);
    })();
  }, []);

  return (
    <>
      {contextHolder}
      <Link to={`/`}>Back to home</Link>
      <h1>Create</h1>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<FieldType> label="Club" name="club">
          <Select
            defaultValue="Select"
            style={{ width: "100%" }}
            options={clubs.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreatePlayer;
