import React from "react";
import { RiArrowLeftLine, RiShareLine } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import Button from "./Button";

function Navbar() {
  return (
    <div className="mx-2 mt-6 flex items-center justify-between">
      <div className="">
        <Button
          icon={<RiArrowLeftLine size={32} />}
          title="back"
          effect="hover:scale-[1.1]"
        />
      </div>
      <p className="ml-2 text-lg font-bold text-gray-400">Now Playing....</p>
      <div className="flex items-center">
        <Button icon={<RiShareLine size={28} />} title="share" />
        <Button icon={<SlOptionsVertical size={28} />} title="option" />
      </div>
    </div>
  );
}

export default Navbar;
