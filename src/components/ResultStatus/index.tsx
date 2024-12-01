import { Link } from "react-router-dom";
import { Button, Result } from "antd";

interface Props {
  title: string;
  subTitle?: string;
  buttonText: string;
  href: string;
  status: "success" | "warning" | "error";
}

function ResultStatus({ title, subTitle, buttonText, href, status }: Props) {
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={[
        <Link to={href}>
          <Button type="primary" key="console">
            {buttonText}
          </Button>
        </Link>,
      ]}
    />
  );
}

export default ResultStatus;
