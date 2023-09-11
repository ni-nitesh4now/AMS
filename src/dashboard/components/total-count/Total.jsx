import React, { useState, useEffect } from "react";
import {
  totalData,
  studentData,
  teacherData,
  parentData,
  managementData,
} from "./data.js";
//   import RectangleImage from "./img/rectangle-54.png";
//   import VectorImage from "./img/vector.svg";
//   import FilterImage from "./img/icons8-filter-96-1.png";
//   import ScreenTimeChart from "./screentime";
import "./total.css";

export default function Total() {
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
    <div className="middle">
      <div className="text-wrapper-7">Users</div>
      <div className="card-groups">
        <div className="card-wrap-2">
          <div className="rectangle">
            <div className="group">
              <div className="text-wrapper-8">Total Management</div>
              <div className="small-text">10% increase in last 28 days</div>
              <div className="text-wrapper-9">{activeData.totalUsers}</div>
            </div>
          </div>
        </div>
        <div className="card-wrap-2">
          <div className="rectangle-2">
            <div className="group">
              <div className="text-wrapper-8">Total Teacher</div>
              <div className="small-text">10% increase in last 28 days</div>
              <div className="text-wrapper-9">{activeData.activeUsers}</div>
            </div>
          </div>
        </div>
        <div className="card-wrap-2">
          <div className="rectangle-3">
            <div className="group">
              <div className="text-wrapper-8">Total Student</div>
              <div className="small-text">10% increase in last 28 days</div>
              <div className="text-wrapper-9">{activeData.totalBilling}</div>
            </div>
          </div>
        </div>
        <div className="card-wrap-2">
          <div className="rectangle-4">
            <div className="group">
              <div className="text-wrapper-8">Total Parent</div>
              <div className="small-text">10% increase in last 28 days</div>
              <div className="text-wrapper-9">{activeData.totalBilling}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
