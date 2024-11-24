import { Link } from "react-router-dom";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import useMessage from "antd/es/message/useMessage";
import { addClub } from "../services/club";

type FieldType = {
  name?: string;
};

const CreateClub = () => {
  const [message, contextHolder] = useMessage();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response = await addClub(values);

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

  return (
    <>
      {contextHolder}
      <Link to={`/`}>Back to home</Link>
      <h1>Create Club</h1>
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
        >
          <Input />
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

export default CreateClub;
