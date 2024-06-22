import React, { useEffect, useState } from "react";
import CustomSideBar from "../../components/CustomSideBar/CustomSideBar";
import {
  CopyOutlined,
  FormOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Homepage.css";
import { Card, Statistic } from "antd";
import { UserData } from "./../../../utils/UserData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../../../utils/AxiosConfig";
function Homepage() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();
  const userData = UserData();
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
    setLoading(true);
    axiosRequest
      .post(`/user/stats`, {
        userId: userData.id,
      })
      .then((res) => {
        setStats(res.data.stats);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <div className="drawer-button">
        <MenuOutlined onClick={() => setDrawer(!drawer)} />
      </div>
      <CustomSideBar selectedItem="Homepage" drawer={drawer} />
      <div
        style={{
          width: "80%",
          display: "flex",
          margin: 20,
        }}
        onClick={() => setDrawer(!drawer)}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            height: "min-content",
            flexWrap: "wrap",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Card
            title="Total Notes"
            hoverable={true}
            style={{ width: "200px" }}
            loading={loading}
          >
            <Statistic
              title="Notes"
              value={stats.totalNotes}
              prefix={<CopyOutlined />}
            />
          </Card>

          <Card
            title="Active Notes"
            hoverable={true}
            style={{ width: "200px" }}
            loading={loading}
          >
            <Statistic
              title="Notes"
              value={stats.totalActiveNotes}
              prefix={<FormOutlined />}
            />
          </Card>
          <Card
            title="Total Users"
            hoverable={true}
            style={{ width: "200px" }}
            loading={loading}
          >
            <Statistic
              title="Time"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
