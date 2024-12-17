import React from "react";

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
        <div className="flex flex-row w-[100%] bg-red-500 justify-around"></div>
      </div>
    </div>
  );
};

export default Pricing;
