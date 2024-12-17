import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { IoIosStar } from "react-icons/io";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

type typeProps = {
  type: "member" | "owner";
};
export const PricingCard = ({ type }: typeProps) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: any) => {
    if (!ref.current) return [0, 0];

    const rect = ref?.current?.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-96 w-72 mt-10 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute grid h-96 w-72  rounded-xl bg-[#00593F] shadow-lg"
      >
        <div className="px-5">
          <p className=" text-center text-2xl text-white font-semibold mt-2">
            {type == "member" ? "Member" : "Owner"}
          </p>
          <p className=" text-center text-base text-white font-normal mt-5">
            {type == "member"
              ? "For space allocations and bookings, we charge a fee of"
              : "For every space booked out, we charge a fee of"}
          </p>
          <p className="text-center text-white mt-16 font-bold text-4xl">
            {type == "member" ? "0%" : "2.17%"}
          </p>
          <p className="text-center text-white  font-extralight text-sm">
            Exluding VAT
          </p>
          <div className="flex flex-row items-center justify-center">
            <p className="text-center text-white  font-extralight text-sm mt-5">
              {type == "member" ? (
                <div className="flex flex-row items-center justify-center">
                  <IoIosStar color="gold" className=" mr-2" />
                  <p>All bookings are free</p>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-center">
                  <IoIosStar color="gold" className=" mr-2" />
                  <p>No upfront membership required</p>
                </div>
              )}
            </p>
          </div>

          <div className="flex flex-row items-center justify-center">
            <IoIosStar color="gold" className="mt-5 mr-2" />
            <p className="text-center text-white  font-extralight items-center text-sm mt-5">
              No monthly payments required
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
