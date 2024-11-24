import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Table, TableProps } from "antd";
import { deleteClub, getClubs } from "../../services/club";

function ClubList() {
  const [data, setData] = useState([]);
  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure want to delete ?")) {
      const remove = data.filter((item: any) => item.id !== id);
      setData(remove);
      return await deleteClub(id as string);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getClubs();
      setData(response as []);
    })();
  }, []);

  const columns: TableProps["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/player/edit/${record.id}`}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={() => handleDelete(record.id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = data.map((item: any) => ({ ...item, key: item.id }));

  return <Table columns={columns} dataSource={dataSource} />;
}

export default ClubList;
