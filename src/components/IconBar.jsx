import React from "react";
import { BsChatSquareQuote } from "react-icons/bs";
import { RiListUnordered } from "react-icons/ri";
import { SiAirplayaudio } from "react-icons/si";

import Button from "./Button";

function IconBar() {
  return (
    <div className="mx-auto mt-4  flex items-center space-x-8">
      <Button
        icon={<BsChatSquareQuote size={24} />}
        title="quote"
        effect="text-[#A29CC0] active:text-white"
      />
      <Button
        icon={<SiAirplayaudio size={24} />}
        title="play"
        effect="text-[#A29CC0] active:text-white"
      />
      <Button
        icon={<RiListUnordered size={24} />}
        title="playlist"
        effect="text-[#A29CC0] active:text-white"
      />
    </div>
  );
}

export default IconBar;
