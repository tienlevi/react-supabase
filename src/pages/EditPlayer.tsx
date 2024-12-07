import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { FormProps, UploadFile, UploadProps } from "antd";
import { Button, Form, Input, InputNumber, Select, Space, Upload } from "antd";
import { editPlayer, getPlayerById } from "../services/player";
import useMessage from "antd/es/message/useMessage";
import { UploadOutlined } from "@ant-design/icons";
import { Club, Player } from "../interface";
import { getClubs } from "../services/club";
import { uploadFile } from "../utils/storage";

type FieldType = {
  name?: string;
  price?: number;
  club: string;
};

const EditPlayer = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [data, setData] = useState<Player>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
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

  const handleChangeImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  console.log(fileList[0]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const upload: any = await uploadFile(fileList[0].originFileObj);
    const response = await editPlayer(id!, {
      ...values,
      image: upload.fullPath,
    });
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
            {/* <input type="file" ref={fileRef} /> */}
          </Space>
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
