import React from "react";
import { PricingCard } from "../pages/PricingCard";
import Calculator from "./calculator/Calculator";

const Pricing = () => {
  const ref = React.useRef(null);
  return (
    <div className="flex flex-wrap ">
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
        <div className="flex flex-row w-[100%] bg-red-600 items-center justify-center">
          <Calculator />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
