import { CiAlarmOn } from "react-icons/ci";
import { FaHandshake } from "react-icons/fa";
import { MdOutlineWifi } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const MeetingRooms = () => {
  return (
    <div className="flex flex-row w-full">
      <div className="flex w-[150%]">
        <LazyLoadImage
          loading="lazy"
          alt="office-meetingroom"
          src="/offices/coworking2.jpg"
          width={"10%"}
          height={"20%"}
          className="rounded-sm absolute mt-5 border-white border-2 left-10"
        />
        <LazyLoadImage
          alt="office-meetingroom"
          src="/offices/coworking1.jpg"
          width={"90%"}
          height={"100%"}
          className="rounded-sm"
          loading="lazy"
        />
        <LazyLoadImage
          loading="lazy"
          alt="office-meetingroom"
          src="/offices/coworking3.jpg"
          width={"10%"}
          height={"20%"}
          className="rounded-sm absolute border-white border-4 place-self-end ml-[40%]"
        />
      </div>
      <div className="flex flex-col h-[100%] w-[80%]">
        <h3 className="font-bold text-xl sm:text-lg">
          AlloSpace connects you to the best working environments
        </h3>
        <h3 className="font-normal text-sm sm:text-sm mt-1">
          Find co-working spaces that provide the best office experience for
          individuals and teams
        </h3>
        <div className="flex flex-row mt-5 items-center">
          <div className=" flex items-center justify-center w-8 h-8 bg-green-500 rounded">
            <CiAlarmOn size={20} className="self-center" />
          </div>
          <div className="flex flex-col ml-5">
            <h1 className="font-bold ">Open 24 hours</h1>
            <h2 className="text-sm">
              Access co-working spaces available around the clock, effortlessly!
            </h2>
          </div>
        </div>
        <div className="flex flex-row mt-5 items-center">
          <div className=" flex items-center justify-center w-15 h-8 bg-green-500 rounded">
            <MdOutlineWifi size={25} className="self-center" />
          </div>
          <div className="flex flex-col ml-5">
            <h1 className="font-bold ">Office pecks</h1>
            <h2 className="text-sm">
              Book and schedule offices with top of the line equipment to handle
              the needs of your team and business
            </h2>
          </div>
        </div>
        <div className="flex flex-row mt-5 items-center">
          <div className=" flex items-center justify-center w-10 h-8 bg-green-500 rounded">
            <FaHandshake size={20} className="self-center" />
          </div>
          <div className="flex flex-col ml-5">
            <h1 className="font-bold ">Enjoy flexibility</h1>
            <h2 className="text-sm">
              Plan flexible schedules that are convenient for you and your team
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
