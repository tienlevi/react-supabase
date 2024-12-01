import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const Loading = () => (
  <Flex
    align="center"
    gap="middle"
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
    }}
  >
    <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
  </Flex>
);

export default Loading;
