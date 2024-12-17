import React from "react";
import { PricingCard } from "../pages/PricingCard";
import Calculator from "./calculator/Calculator";
import PriceDashboard from "./PriceDashboard";

const Pricing = () => {
  const ref = React.useRef(null);
  return (
    <div className="flex flex-wrap pb-14">
      <div className="flex w-[100%] flex-col mt-20 justify-center items-center ">
        <p className="text-black font-extrabold text-3xl flex text-wrap">
          Fair and simplistic pricing
        </p>
        <p className="text-black font-normal text-base text-wrap">
          Allospace only makes money when you do. You are number one to us.
        </p>
        <div className="flex flex-row w-[100%]  justify-around">
          <PricingCard type={"owner"} />
          <PricingCard type={"member"} />
        </div>
        <div className="flex flex-col w-[100%]  items-center pl-20  mt-4">
          <div className="flex flex-col self-start">
            <p className="font-extrabold text-2xl">Do the calculation</p>
            <p className="font-normal text-normal flex-wrap text-left">
              You can easily input a desired booking amount and see more details
            </p>
          </div>
          <div className="flex flex-row justify-between w-[100%] px-10">
            <Calculator />
            <PriceDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
