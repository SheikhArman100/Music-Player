import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { AppContext } from "../context api/AppContext";

function ButtonConfig({ children, onClick = () => {}, className }) {
  const [pressing, setPressing] = useState(false);

  return (
    <motion.button
      onTapStart={() => {
        setPressing(true);
      }}
      onTap={() => {
        setPressing(false);
        onClick();
      }}
      initial={false}
      animate={pressing ? "pressed" : "unpressed"}
      variants={{
        pressed: {
          scale: 0.85,
          backgroundColor: "rgba(229 231 235 .25)",
          opacity: 0.7,
        },
        unpressed: {
          scale: [null, 0.85, 1],
          opacity: 1,
          backgroundColor: [
            null,
            "rgba(229 231 235 .25)",
            "rgba(229 231 235 0)",
          ],
        },
      }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0.5,
      }}
      className={`relative flex items-center justify-center rounded-full text-white ${className}`}
    >
      {children}
    </motion.button>
  );
}

function PlayerControls() {
  const { playing, setPlaying } = useContext(AppContext);

  return (
    <div className="mx-auto  flex items-center space-x-6">
      <div className="flex items-center justify-between px-4">
        <ButtonConfig className="h-20 w-20 p-3">
          <FaBackward size={36} />
        </ButtonConfig>

        <ButtonConfig
          onClick={() => setPlaying(!playing)}
          className="h-20 w-20 p-3"
        >
          {playing ? <FaPause size={36} /> : <FaPlay size={36} />}
        </ButtonConfig>

        <ButtonConfig className="h-20 w-20 p-3">
          <FaForward size={36} />
        </ButtonConfig>
      </div>
    </div>
  );
}
export default PlayerControls;
