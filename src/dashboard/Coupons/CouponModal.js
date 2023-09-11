import React, { useEffect, useState } from "react";

import Select from "react-select";

const CouponModal = (props) => {
  const { showModal, setShowModal, dataHandler } = props;
  const typeoptions = [
    {
      value: "one-time",
      label: "One Time Apply",
    },
    { value: "assign-limit", label: "Assign Limits" },
    { value: "first-limited-user", label: "First Limited User" },
  ];
  const discountOptions = [
    { value: "percentage", label: "Percentage" },
    { value: "Number", label: "Number" },
  ];
  const [discount, setDiscount] = useState("");
  const [validity, setValidity] = useState("");
  const [type, setType] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      discount,
      validity,
      type,
      code,
      description,
    };
    dataHandler(obj);
    setDiscount("");
    setValidity("");
    setType("");
    setCode("");
    setDescription("");
    setShowModal(false);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  return (
    <>
      <div className="modal-wrapper">
        <div className="modal-content">
          <h3 className="text-wrapper-modal">Create Coupon</h3>
          <div className="content-wrapper-1">
            <div className="modal-discount-div">
              <h5 className="modal-discount-name">Discount</h5>
              <input
                type="text"
                className="modal-discount"
                placeholder="example"
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
              />
            </div>

            <div className="modal-validity-div">
              <h5 className="modal-validity-name">Validity</h5>
              <input
                type="date"
                className="modal-validity"
                onChange={(e) => {
                  setValidity(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="content-wrapper-2">
            <h5 className="modal-type-name">Type</h5>
            <input
              type="text"
              className="modal-type"
              list="cityname"
              placeholder="example"
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
            <datalist id="cityname">
              <option value="New Delhi"></option>
              <option value="Mumbai"></option>
            </datalist>
          </div>
          <div className="content-wrapper-3">
            <h5 className="modal-code-name">Create Code</h5>
            <input
              type="text"
              className="modal-code"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </div>
          <div className="content-wrapper-4">
            <h5 className="modal-desc-name">Description</h5>
            <input
              type="text"
              className="modal-desc"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="modal-buttons">
            <button className="modal-create" onClick={submitHandler}>
              Create
            </button>
            <button
              className="modal-cancel"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponModal;
