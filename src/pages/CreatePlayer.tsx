import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { FormProps, UploadFile, UploadProps } from "antd";
import { Button, Form, Input, InputNumber, Select, Space, Upload } from "antd";
import { addPlayer } from "../services/player";
import useMessage from "antd/es/message/useMessage";
import { getClubs } from "../services/club";
import { Club } from "../interface";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "../utils/storage";
import useAuth from "../hooks/useAuth";

type FieldType = {
  name?: string;
  price?: number;
  club: string;
  image?: string;
};

const CreatePlayer = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [message, contextHolder] = useMessage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const upload: any = await uploadFile(fileList[0].originFileObj);
    const response = await addPlayer({ ...values, image: upload.fullPath });
    if (response?.status !== 201) {
      return message.error("Add error");
    }
    return message.success("Add success");
  };

  const handleChangeImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
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
      <h1>Create Player</h1>
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
        <Form.Item label="Image">
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Upload
              onChange={handleChangeImage}
              fileList={fileList}
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
              showUploadList={{ removeIcon: true }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Space>
        </Form.Item>
        <Form.Item label={null} style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreatePlayer;
