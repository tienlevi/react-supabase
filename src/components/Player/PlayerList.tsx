import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Table, TableProps } from "antd";
import { Club, Player } from "../../interface";
import { deletePlayer, getPlayers } from "../../services/player";
import { getClubs } from "../../services/club";
import { supabaseUrl } from "../../constants";

function PlayerList() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [data, setData] = useState<Player[]>([]);
  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure want to delete ?")) {
      const remove = data.filter((item) => item.id !== id);
      setData(remove);
      return await deletePlayer(id as string);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getPlayers();
      setData(response as []);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getClubs();
      setClubs(response as []);
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          src={`${supabaseUrl}/storage/v1/object/public/${record.image}`}
          alt=""
          width={150}
          height={150}
          style={{ objectFit: "contain" }}
        />
      ),
    },
    {
      title: "Club",
      dataIndex: "club",
      key: "club",
      render: (_, record) => (
        <p>{clubs.find((item) => item.id === record.club)?.name}</p>
      ),
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

  const dataSource = data.map((item) => ({ ...item, key: item.id }));

  return <Table columns={columns} dataSource={dataSource} />;
}

export default PlayerList;
