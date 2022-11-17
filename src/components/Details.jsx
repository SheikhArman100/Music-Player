import { motion } from "framer-motion";
import React, { useContext } from "react";
import image from "../assets/song.jpg";
import { AppContext } from "../context api/AppContext";

function Details() {
  const { playing } = useContext(AppContext);
  return (
    <>
      {/* <img
        src={image}
        alt="car"
        className="mx-12 mt-6 aspect-[2/1.9] rounded-2xl bg-contain transition-all  duration-300 ease-in-out hover:scale-105"
      /> */}
      <motion.img
        src={image}
        initial={false}
        animate={playing ? "grow" : "shrink"}
        variants={{
          grow: {
            scale: 1.1,
            transition: {
              type: "spring",
              duration: 1,
              bounce: 0.5,
              delay: 0.05,
            },
          },
          shrink: {
            scale: 1,
            transition: {
              type: "spring",
              duration: 0.7,
              bounce: 0,
              delay: 0.05,
            },
          },
        }}
        className="mx-12 mt-6 aspect-[2/1.9] rounded-2xl bg-contain"
      />

      <div className="mx-6 mt-7">
        <h3 className="truncate text-lg font-medium leading-tight text-white">
          Amr Sotto (Controll room-2){" "}
        </h3>
        <p className="truncate text-lg leading-tight text-[#A49FC3]/90">
          Karnival
        </p>
      </div>
    </>
  );
}

export default Details;
