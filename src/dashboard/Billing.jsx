import React, { useState, useEffect } from "react";
import "./css/syyle.css";
import VectorImage from "./img/vector.svg";
import Profile from "./img/rectangle-54.png";
import Piechart from "./Billingpiechart";
import Barchart from "./Billingbarchart";
import BScreenTimeChart from "./BillingScreenTime";
import SideNav from "./SideNav";

const Billing = () => {

  return (
    <div className="billing_screen" >
      <SideNav xyz={"billing"}/>
      <div className="billing_group-11">
        <img className="billing_profile" alt="Rectangle" src={Profile} />
        <div className="billing_notification-wrapper">
          <img className="billing_notification" alt="Vector" src={VectorImage} />
        </div>
      </div>

      <div className="billing_text-wrapper-7">Billing</div>
      <div className="billing_outer"> 
        <div className="billing_text-wrapper-3-1">Sources</div>
        <div className="billing_piechart" >
            <Piechart/>
        </div>
      </div>

      <div className="billing_outer-3" >
      <div className="billing_text-wrapper-3-1">Expenses</div>
      <div className="billing_barchart" >
        <Barchart/>
      </div>
      </div>

      <div className="billing_outer-group-wrapper" >
        <div className="billing_outer-group-2" >
          <BScreenTimeChart/>
        </div>
      </div>



      <div className="billing_text-wrapper" > 
        <div className="billing_text-wrapper-1">Total amount</div>
        <div className="billing_text-wrapper-2" >$ 2.5 lakh</div>

        <div className="billing_text-wrapper-3">Total users</div>
        <div className="billing_text-wrapper-4" >5 lakh</div>

       
        <div className="billing_text-wrapper-5">
          <div className="billing_text-wrapper-5_1">Total Users</div>
          <div className="billing_text-wrapper-5_2">5 lakh</div>
        </div>

        <div className="billing_text-wrapper-6">
          <div className="billing_text-wrapper-5_1">Total Users</div>
          <div className="billing_text-wrapper-5_2">5 lakh</div>
        </div>  
      </div>


    </div>
  );
};

export default Billing;