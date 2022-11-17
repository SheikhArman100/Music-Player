import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  // eslint-disable-next-line prettier/prettier
  useTransform
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function Slider({ backgroundColor, progressColor, height }) {
  const max = 100;
  const min = 0;
  const [dragging, setDragging] = useState(false);
  const constraintsRef = useRef();
  const [value, setValue] = useState(0);
  const percent = value / (max - min);
  const handleSize = 24;
  const handleRef = useRef();
  const progressBarRef = useRef();
  const handleX = useMotionValue(0);
  const progress = useTransform(handleX, (v) => v + handleSize / 2);
  const progColor = useMotionValue(progressColor);
  const backColor = useMotionValue(backgroundColor);
  const backGround = useMotionTemplate`linear-gradient(90deg, ${progColor} ${progress}px, ${backColor} 0)`;
  function handleDrag() {
    const handleBounds = handleRef.current.getBoundingClientRect(); // here we will get to know the position of handle
    const middleOfHandle = handleBounds.x + handleBounds.width / 2; // we are using the center of handle as a center of attraction
    const progressBarBounds = progressBarRef.current.getBoundingClientRect();
    const newProgress =
      (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;
    setValue(newProgress * (max - min));
  }
  useEffect(() => {
    const newProgress = value / (max - min);
    const progressbarBounds = progressBarRef.current.getBoundingClientRect();
    handleX.set(newProgress * progressbarBounds.width);

    return () => {};
  }, [handleX, max, value, min]);

  return (
    <div className="">
      <div data-test="slider" className="relative flex flex-col justify-center">
        <motion.div
          data-test="slider-background"
          className="absolute w-full rounded-full "
          style={{
            background: backGround,
            height,
          }}
        />
        <div
          data-test="slider-progress"
          ref={progressBarRef}
          className="absolute"
          style={{
            left: handleSize / 2,
            right: handleSize / 2,
          }}
        />
        <div ref={constraintsRef}>
          <motion.div
            data-test="slider-handle"
            ref={handleRef}
            className="relative z-10 rounded-full bg-red-500"
            style={{
              height: handleSize,
              width: handleSize,
              x: handleX,
            }}
            animate={{
              scale: dragging ? 2 : 1,
            }}
            drag="x"
            dragMomentum={false}
            dragConstraints={constraintsRef}
            dragElastic={0}
            onDrag={handleDrag}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            onPointerDown={() => setDragging(true)}
            onPointerUp={() => setDragging(false)}
          />
        </div>
        <div
          data-test="slider-clickable-area"
          className="absolute h-4 w-full"
          onPointerDown={(event) => {
            const { left, width } =
              progressBarRef.current.getBoundingClientRect();
            const position = event.pageX - left;
            const newProgress = clamp(position / width, 0, 1);
            const newValue = newProgress * (max - min);
            setValue(clamp(newValue, min, max));
            animate(handleX, newProgress * width);
          }}
        />
      </div>
      <motion.div animate={{ y: dragging && percent < 0.1 ? 20 : 0 }}>
        {Math.floor(value * 100) / 100}
      </motion.div>
    </div>
  );
}

export default Slider;
