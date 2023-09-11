import React, { useState, useEffect } from "react";
import "./css/style.css";
import {
  totalData,
  studentData,
  teacherData,
  parentData,
  managementData,
} from "./data.js";
import RectangleImage from "./img/rectangle-54.png";
import VectorImage from "./img/vector.svg";
import FilterImage from "./img/icons8-filter-96-1.png";
import ScreenTimeChart from "./screentime";
import SideNav from "./SideNav";

const Dashboard = () => {
  const [allActive, setAllActive] = useState(true);
  const [studentActive, setStudentActive] = useState(false);
  const [teacherActive, setTeacherActive] = useState(false);
  const [parentActive, setParentActive] = useState(false);
  const [managementActive, setManagementActive] = useState(false);

  const toggleButton = (button) => {
    setAllActive(button === "All");
    setStudentActive(button === "Student");
    setTeacherActive(button === "Teacher");
    setParentActive(button === "Parent");
    setManagementActive(button === "Management");
  };
  const getData = () => {
    if (allActive) {
      return totalData;
    } else if (studentActive) {
      return studentData;
    } else if (teacherActive) {
      return teacherData;
    } else if (parentActive) {
      return parentData;
    } else if (managementActive) {
      return managementData;
    }
  };
  const activeData = getData();

  return (
    <div className="screen">
      <SideNav xyz={"Dashboard"} />
      <div className="group-11">
        <img className="profile" alt="Rectangle" src={RectangleImage} />
        <div className="notification-wrapper">
          <img className="notification" alt="Vector" src={VectorImage} />
        </div>
      </div>
      <div className="outer">
        <div className="text-wrapper-3">Verification request</div>{" "}
        <div className="text-wrapper-5">{activeData.requests}*</div>
        <p className="p">
          The requests should be completed under 24 hours
        </p>{" "}
        <div className="bartext-wrapper-4">See more</div>
        <div className="bars">
          <div className="bar-wrap">
            <div className="bartext-wrapper">Document verification needed</div>
            <div className="bartext-wrapper-2">
              {activeData.documentVerification}
            </div>
          </div>
          <div className="bar-wrap">
            <div className="bartext-wrapper">Send code</div>
            <div className="bartext-wrapper-2">{activeData.sendCode}</div>
          </div>
        </div>
      </div>
      <div className="outer-3">
        <div className="text-wrapper-3">Total Coupons</div>
        <div className="text-wrapper-6">{activeData.totalCoupons}</div>
      </div>
      <div className="text-wrapper-7">Dashboard</div>
      <div className="card">
        <div className="card-wrap-2">
          <div className="rectangle">
            <div className="group">
              <div className="text-wrapper-8">Total users</div>
              <div className="text-wrapper-9">{activeData.totalUsers}</div>
            </div>
          </div>
        </div>
        <div className="card-wrap-2">
          <div className="rectangle-2">
            <div className="group">
              <div className="text-wrapper-8">Active user</div>
              <div className="text-wrapper-9">{activeData.activeUsers}</div>
            </div>
          </div>
        </div>
        <div className="card-wrap-2">
          <div className="rectangle-3">
            <div className="group">
              <div className="text-wrapper-8">Total billing</div>
              <div className="text-wrapper-9">{activeData.totalBilling}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-wrap-3">
        <div
          className={`card-wrap-4 ${allActive ? "active" : ""}`}
          onClick={() => toggleButton("All")}
        >
          <div className="text-wrapper-13">All</div>
        </div>
        <div
          className={`card-wrap-4 ${studentActive ? "active" : ""}`}
          onClick={() => toggleButton("Student")}
        >
          <div className="text-wrapper-13">Student</div>
        </div>
        <div
          className={`card-wrap-4 ${teacherActive ? "active" : ""}`}
          onClick={() => toggleButton("Teacher")}
        >
          <div className="text-wrapper-13">Teacher</div>
        </div>
        <div
          className={`card-wrap-4 ${parentActive ? "active" : ""}`}
          onClick={() => toggleButton("Parent")}
        >
          <div className="text-wrapper-13">Parent</div>
        </div>
        <div
          className={`card-wrap-4 ${managementActive ? "active" : ""}`}
          onClick={() => toggleButton("Management")}
        >
          <div className="text-wrapper-13">Management</div>
        </div>
        <div className="filter-wrapper">
          <img className="filter" alt="Filter" src={FilterImage} />
        </div>
      </div>
      <div className="outer-group-wrapper">
        <div className="outer-group-2">
          <ScreenTimeChart activeData={activeData} />
        </div>
      </div>
      <div className="outer-6">
        <div className="text-wrapper-31">Total users</div>
        <div className="text-wrapper-32">{activeData.activeUsers}</div>
        <div className="outer-7">
          <div className="text-wrapper-29">Total billing</div>
          <div className="text-wrapper-30">{activeData.totalBilling}</div>
        </div>
        <div className="bottom">
          <div className="active-subscription">
            <div className="heading">
              {" "}
              Active <br />
              Subscription
            </div>
            <div className="text-wrapper-33">{activeData.activeSub}</div>
          </div>
          <div className="expired-subscription">
            <div className="heading">
              {" "}
              Expired <br />
              Subscription
            </div>
            <div className="text-wrapper-34">{activeData.expiredSub}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
