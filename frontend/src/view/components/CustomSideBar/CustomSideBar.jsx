import React from 'react'
import "./CustomSideBar.css"
import {useNavigate} from "react-router-dom"

import {FormOutlined, HomeOutlined} from "@ant-design/icons";

function CustomSideBar({selectedItem,drawer}) {
    const navigate=useNavigate();
  return (
    <div className={`custom-sidebar ${drawer ? 'sidebar-open' : ''}`}>
        <div style={{margin:16}}>
        <img src='../assets/logo.png' width={150} style={{borderRadius:10}}>
      </img>
        </div>
      <br></br>
      <div onClick={()=>{
        navigate("/")
      }} className={`menu-item-container ${selectedItem === "Homepage" ? 'selected' : ''}`}>
        <span>
        <HomeOutlined style={{marginRight:10}} />Homepage
        </span>
      </div>

      <div onClick={()=>{
        navigate("/notes")
      }} className={`menu-item-container ${selectedItem === "notes" ? 'selected' : ''}`}>
        <span>
        <FormOutlined style={{marginRight:10}} />My Notes
        </span>
      </div>


    </div>
  )
}

export default CustomSideBar