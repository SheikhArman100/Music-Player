import React from "react";
import { FaSignal, FaWifi } from "react-icons/fa";
import { IoBatteryHalf } from "react-icons/io5";
import { TiLocationArrowOutline } from "react-icons/ti";

function Header() {
  return (
    <div className="flex w-full items-center justify-between ">
      <div className="flex items-center space-x-2">
        <span className="text-[17px] font-semibold text-white">6:18</span>
        <TiLocationArrowOutline size={24} className="font-bold text-white" />
      </div>
      <div className="flex items-center space-x-3">
        <FaSignal size={18} className=" text-white" />
        <FaWifi size={18} className=" text-white" />
        <IoBatteryHalf size={22} className=" text-white" />
      </div>
    </div>
    // <div className="mb-8 w-full pt-3">
    //   <div className="flex items-center justify-between pl-3 pr-1 ">
    //     <div className="flex items-center space-x-1.5">
    //       <span className="text-[17px] font-semibold text-white">6:18</span>
    //       <CiLocationArrow1 className="w-[13px] text-white" />
    //     </div>
    //     <div className="flex items-center space-x-1.5">
    //       <FaSignal className="h-[18px] text-white" />
    //       <FaWifi className="h-[22px] text-white" />
    //       <IoBatteryHalf className="h-[24px] text-white" />
    //     </div>
    //   </div>
    //   <div className="mx-auto mt-4 h-[5px] w-9 rounded-full bg-white/20" />
    // </div>
  );
}

export default Header;
