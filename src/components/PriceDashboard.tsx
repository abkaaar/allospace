import React from "react";

const PriceDashboard = () => {
  return (
    <div className="bg-black w-[50%] rounded-sm py-5 px-2">
      <div className="flex flex-col">
        <p className="text-white font-semibold  uppercase self-center">
          Value of bookings
        </p>
        <p className="text-white font-semibold  uppercase self-center">val</p>
      </div>
      <div className="flex flex-row mt-[15%]">
        <div className="flex flex-col">
          <p className="text-white font-semibold ml-10 uppercase">
            How much you receive
          </p>
          <p className="text-white font-semibold ml-10 uppercase">val</p>
        </div>
        <div className="flex flex-col">
          <p className="text-white font-semibold ml-10 uppercase">
            Allospace fees
          </p>
          <p className="text-white font-semibold ml-10 uppercase">val</p>
        </div>
      </div>
      <p className="text-gray-400 font-light  mt-[20%] italic ml-[40%]">
        No hidden fees.
      </p>
    </div>
  );
};

export default PriceDashboard;
