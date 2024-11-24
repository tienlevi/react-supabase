import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { editPlayer, getPlayerById } from "../services/player";
import useMessage from "antd/es/message/useMessage";
import { Club, Player } from "../interface";
import { getClubs } from "../services/club";

type FieldType = {
  name?: string;
  price?: number;
  club: string;
};

const EditPlayer = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [data, setData] = useState<Player>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [form] = Form.useForm();
  const [message, contextHolder] = useMessage();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getPlayerById(id!);
        setData(response!);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getClubs();
      setClubs(response as []);
    })();
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response = await editPlayer(id!, values);

    if (response?.status !== 204) {
      return message.error("Edit error");
    }
    return message.success("Edit success");
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  if (loading) return <>Loading....</>;

  return (
    <>
      {contextHolder}
      <Link to={`/`}>Back to home</Link>
      <h1>Edit</h1>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={data}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
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
            style={{ width: "100%" }}
            options={clubs.map((item) => {
              if (item.id === data?.club) {
                return { value: item?.id, label: item?.name, checked: true };
              } else {
                return { value: item?.id, label: item?.name };
              }
            })}
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

export default EditPlayer;
