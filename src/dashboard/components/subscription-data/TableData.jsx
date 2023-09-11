import React, { useState } from "react";
// import 'antd/dist/antd.css';
import "./table-data.css";
import { Table, Tag, Space, Button, Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPause,
  faEdit,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const { Column } = Table;

const data = [
  {
    key: "1",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "2",
    userid: "102",
    name: "Jane Smith",
    email: "janesmith@example.com",
    mobile: "987-654-3210",
    subscriptionStatus: "Inactive",
    subscriptionExpiry: "2023/06/30",
  },
  {
    key: "3",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Inactive",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "4",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "5",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Inactive",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "6",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "7",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "8",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "9",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "10",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Inactive",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "11",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Inactive",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "12",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Inactive",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "13",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2023/12/31",
  },
  {
    key: "14",
    userid: "101",
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    subscriptionStatus: "Inactive",
    subscriptionExpiry: "2023/12/31",
  },
  // Add more data as needed
];

export default function MyTable() {
  // Define state variables for label text and active status
  const [activeButton, setActiveButton] = useState("Active");

  // Function to handle button clicks and update the active button
  const handleButtonClick = (buttonText) => {
    setActiveButton(buttonText);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleBlock = (record) => {
    // Handle the block action here
    console.log(`Block users with IDs: ${selectedRowKeys}`);
  };

  const handleSuspend = (record) => {
    // Handle the suspend action here
    console.log(`Suspend users with IDs: ${selectedRowKeys}`);
  };

  const handleEdit = (record) => {
    // Handle the edit action here
    console.log(`Edit user with ID: ${record.userid}`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
    <h2 className="headd">Subuscription</h2>
      <div className="filter-style">
        <button
          className={
            activeButton === "Active" ? "active-button" : "inactive-button"
          }
          onClick={() => handleButtonClick("Active")}
        >
          All {`(2.5 lakh)`}
        </button>
        <button
          className={
            activeButton === "Inactive" ? "active-button" : "inactive-button"
          }
          onClick={() => handleButtonClick("Inactive")}
        >
          Active (2 lakh)
        </button>
        <button
          className={
            activeButton === "Other" ? "active-button" : "inactive-button"
          }
          onClick={() => handleButtonClick("Other")}
        >
          Inactive (50,000)
        </button>
        <div className="input-container">
          <i className="fa fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search User"
            className="input-field"
          />
        </div>
      </div>
      <div className="table-wrapper">
        <Table rowSelection={rowSelection} dataSource={data}>
          <Column title="User ID" dataIndex="userid" key="userid" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Mobile" dataIndex="mobile" key="mobile" />
          <Column
            title="Subscription Status"
            dataIndex="subscriptionStatus"
            key="subscriptionStatus"
            render={(status) => (
              <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
            )}
          />
          <Column
            title="Subscription Expiry"
            dataIndex="subscriptionExpiry"
            key="subscriptionExpiry"
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle" className="middle">
                <div>
                  <FontAwesomeIcon
                    icon={faBan}
                    onClick={() => handleBlock(record)}
                    style={{ cursor: "pointer", color: "rgba(79, 120, 254, 1" }}
                  />
                  <div>Block</div>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    onClick={() => handleSuspend(record)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      color: "rgba(79, 120, 254, 1",
                    }}
                  />
                  <div>Suspend</div>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEdit(record)}
                    style={{ cursor: "pointer", color: "rgba(79, 120, 254, 1" }}
                  />
                  <div>Edit</div>
                </div>
              </Space>
            )}
          />
        </Table>
      </div>
    </>
  );
}
