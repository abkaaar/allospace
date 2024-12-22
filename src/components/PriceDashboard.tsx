import { CalcContext } from "@/context/CalcContext";
import React, { useContext } from "react";

const PriceDashboard = () => {
  const { calc } = useContext(CalcContext);
  let Formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });
  const allotedPrice = calc.num
    ? (2.17 / 100) * calc.num
    : calc.res
    ? (2.17 / 100) * calc.res
    : 0.0;
  const creditedPrice = calc.num
    ? calc.num - allotedPrice
    : calc.res
    ? calc.res - allotedPrice
    : 0.0;

  console.log(allotedPrice);
  return (
    <div className="bg-black rounded-sm py-5 px-2 max-md:mt-[10%] w-[100%] max-sm:mt-[10%] lg:w-[50%] ml-[5%]">
      <div className="flex flex-col">
        <p className="text-white font-semibold  uppercase self-center">
          Value of bookings
        </p>
        <p className="text-white font-semibold  uppercase self-center">
          {calc.num ? Formatter.format(calc.num) : Formatter.format(calc.res)}
        </p>
      </div>
      <div className="flex flex-row mt-[15%] justify-around max-sm:flex-col items-center">
        <div className="flex flex-col">
          <p className="text-white font-semibold  uppercase justify-center text-center ">
            How much you receive
          </p>
          <p className="text-white font-semibold text-center uppercase text-wrap max-sm:mb-10">
            {Formatter.format(creditedPrice)}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-white font-semibold uppercase justify-center text-center">
            Allospace fees (2.17%)
          </p>
          <p className="text-white font-semibold uppercase text-center text-wrap">
            {Formatter.format(allotedPrice)}
          </p>
        </div>
      </div>
      <p className="text-gray-400 font-light  mt-[20%] italic ml-[40%]">
        No hidden fees.
      </p>
    </div>
  );
};

export default PriceDashboard;
