import React, { useState, useEffect } from "react";
import "./style.css";
import RectangleImage from "./img/rectangle-54.png";
import VectorImage from "./img/vector.svg";
// import FilterImage from "./img/icons8-filter-96-1.png";
import { Card, Col, Row } from "react-bootstrap";
import CouponModal from "./CouponModal";
import SideNav from "../SideNav";
import Head from "../Head";

const Coupon = () => {
  const [allActive, setAllActive] = useState(true);
  const [Active, setActive] = useState(false);
  const [Expired, setExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  console.log(data);
  const dataHandler = (submitData) => {
    const updatedArray = [...data, submitData];

    setData(updatedArray);
  };

  const toggleButton = (button) => {
    setAllActive(button === "All");
    setActive(button === "Active");
    setExpired(button === "Expired");
  };

  const handleCardClick = (index) => {
    if (index === activeCardIndex) {
      setActiveCardIndex(null); 
    } else {
      setActiveCardIndex(index);
    }
  };
  console.log("data length:", data);
  return (
    <div className="coupon-screen">
      <SideNav xyz={"coupon"} />
      <Head/>
      <div className="text-wrapper-7">Coupon</div>
      <div className="card-top">
        <div
          className={`card-wrap-4 ${allActive ? "active" : ""}`}
          onClick={() => toggleButton("All")}
        >
          <div className="text-wrapper-13">All</div>
        </div>
        <div
          className={`card-wrap-4 ${Active ? "active" : ""}`}
          onClick={() => toggleButton("Active")}
        >
          <div className="text-wrapper-13">Active</div>
        </div>
        <div
          className={`card-wrap-4 ${Expired ? "active" : ""}`}
          onClick={() => toggleButton("Expired")}
        >
          <div className="text-wrapper-13">Expired</div>
        </div>
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field-coupon"
          placeholder="Search user"
        />
      </div>
      {/* <div> */}
      <di className="coupon-card">
        <Col md={3}>
          <div className="subscription-card-create">
            <button className="button" onClick={(e) => setShowModal(true)}>
              <span>+</span>
              <br />
              <b>Create new Coupon</b>
            </button>

            {showModal && (
              <CouponModal
                showModal={showModal}
                setShowModal={setShowModal}
                dataHandler={dataHandler}
              />
            )}
          </div>
        </Col>
        {data &&
          data.length > 0 &&
          data?.map((couponData, index) => (
            <Col key={index} className="coupon-items">
              <div
                key={index}
                className={`subscription-card ${
                  activeCardIndex === index ? "active" : ""
                }`}
                onClick={() => handleCardClick(index)}
              >
                <p
                  style={{
                    color: "#707070",
                    fontSize: "32px",
                    margin: "20px",
                    padding: "20px",
                    paddingBottom: "0px",
                    fontWeight: "700",
                    fontFamily: "Poppins",
                  }}
                  className="coupon-dis"
                >
                  <b>{couponData?.discount ?? ""}</b>
                </p>

                <p
                  style={{
                    color: "#A9A9B1",
                    fontSize: "16px",
                    marginLeft: "30px",
                  }}
                  className="coupon-desc"
                >
                  {couponData?.description ?? "-"}
                </p>
                <p
                  style={{
                    color: "#707070",
                    fontSize: "25px",
                    marginLeft: "30px",
                    paddingTop: "20px",
                  }}
                  className="coupon-code"
                >
                  <b>{couponData?.code ?? "-"}</b>
                </p>
                <p className="left-entry">
                  <small>Count</small>
                  <br />
                  {couponData?.type ?? 0}
                </p>
                <p className="right-entry">
                  <small>Validity</small>
                  <br />
                  {couponData?.validity ?? 0}
                </p>
              </div>
            </Col>
          ))}
      </di>
      {/* </div> */}
    </div>
  );
};
export default Coupon;
