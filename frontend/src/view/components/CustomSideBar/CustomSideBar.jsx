import React from "react";
import "./CustomSideBar.css";
import { useNavigate } from "react-router-dom";

import { FormOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";

function CustomSideBar({ selectedItem, drawer }) {
  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div className={`custom-sidebar ${drawer ? "sidebar-open" : ""}`} style={{justifyContent:"space-between",display:"flex",flexDirection:"column"}}>
      <div>
        <div style={{ margin: 16 }}>
          <img
            src="../assets/logo.png"
            width={70}
            style={{ borderRadius: 10 }}
          ></img>
        </div>
        <br></br>
        <div
          onClick={() => {
            navigate("/");
          }}
          className={`menu-item-container ${
            selectedItem === "Homepage" ? "selected" : ""
          }`}
        >
          <span>
            <HomeOutlined style={{ marginRight: 10 }} />
            Homepage
          </span>
        </div>

        <div
          onClick={() => {
            navigate("/notes");
          }}
          className={`menu-item-container ${
            selectedItem === "notes" ? "selected" : ""
          }`}
        >
          <span>
            <FormOutlined style={{ marginRight: 10 }} />
            My Notes
          </span>
        </div>
      </div>
      <div
        onClick={handleLogout}
        className={`menu-item-container`}
        style={{border:"1px solid var(--primary-color)"}}
      >
        <span style={{ marginRight: 10 ,color:"var(--primary-color)"}}>
        <LogoutOutlined  style={{ marginRight: 10 ,color:"var(--primary-color)"}} />
          Logout
        </span>
      </div>
    </div>
  );
}

export default CustomSideBar;
