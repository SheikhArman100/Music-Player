import {
  motion,
  useDragControls,
  useMotionTemplate,
  useMotionValue,
  // eslint-disable-next-line prettier/prettier
  useTransform
} from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context api/AppContext";

// function'
function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function getProgressFromX({ x, containerRef }) {
  const bounds = containerRef.current.getBoundingClientRect();
  const progress = (x - bounds.x) / bounds.width;

  return clamp(progress, 0, 1);
}

function getXFromProgress({ progress, containerRef }) {
  const bounds = containerRef.current.getBoundingClientRect();

  return progress * bounds.width;
}

function useInterval(callback, delay) {
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
}

function ProgressBar() {
  const { currentTime, setCurrentTime, playing } = useContext(AppContext);
  const DURATION = 186;
  const [dragging, setDragging] = useState(false);
  const constraintsRef = useRef();
  const fullBarRef = useRef();
  const scrubberRef = useRef();
  const scrubberX = useMotionValue(0);
  const currentTimePrecise = useMotionValue(currentTime);
  const progressPrecise = useTransform(
    currentTimePrecise,
    (v) => (v / DURATION) * 100,
  );
  const progressPreciseWidth = useMotionTemplate`${progressPrecise}%`;
  const dragControls = useDragControls();

  const mins = Math.floor(currentTime / 60);
  const secs = `${currentTime % 60}`.padStart(2, "0");
  const timecode = `${mins}:${secs}`;
  const minsRemaining = Math.floor((DURATION - currentTime) / 60);
  const secsRemaining = `${(DURATION - currentTime) % 60}`.padStart(2, "0");
  const timecodeRemaining = `${minsRemaining}:${secsRemaining}`;
  const progress = (currentTime / DURATION) * 100;

  useInterval(
    () => {
      if (currentTime < DURATION) {
        setCurrentTime((t) => t + 1);
      }
    },
    playing ? 1000 : null,
  );

  useInterval(
    () => {
      if (currentTime < DURATION) {
        currentTimePrecise.set(currentTimePrecise.get() + 0.01);
        const newX = getXFromProgress({
          containerRef: fullBarRef,
          progress: currentTimePrecise.get() / DURATION,
        });
        scrubberX.set(newX);
      }
    },
    playing ? 10 : null,
  );
  return (
    <div className="relative mx-6 mt-5">
      <div
        className="relative"
        onPointerDown={(event) => {
          const newProgress = getProgressFromX({
            containerRef: fullBarRef,
            x: event.clientX,
          });
          dragControls.start(event, { snapToCursor: true });
          setCurrentTime(Math.floor(newProgress * DURATION));
          currentTimePrecise.set(newProgress * DURATION);
        }}
      >
        <div
          ref={fullBarRef}
          className="h-[3px] w-full rounded-full bg-[#5A526F]"
        />
        <motion.div
          layout
          style={{ width: progressPreciseWidth }}
          className="absolute top-0"
        >
          <div className="absolute inset-0 h-[3px] rounded-full bg-[#A29CC0]" />
        </motion.div>
        <div
          className="absolute inset-0 -ml-[15px] -mr-[17px]"
          ref={constraintsRef}
        >
          <motion.button
            ref={scrubberRef}
            drag="x"
            dragConstraints={constraintsRef}
            dragControls={dragControls}
            dragElastic={0}
            dragMomentum={false}
            style={{ x: scrubberX }}
            onDrag={() => {
              const scrubberBounds =
                scrubberRef.current.getBoundingClientRect();
              const middleOfScrubber =
                scrubberBounds.x + scrubberBounds.width / 2;
              const newProgress = getProgressFromX({
                containerRef: fullBarRef,
                x: middleOfScrubber,
              });
              setCurrentTime(Math.floor(newProgress * DURATION));
              currentTimePrecise.set(newProgress * DURATION);
            }}
            onDragStart={() => {
              setDragging(true);
            }}
            onPointerDown={() => {
              setDragging(true);
            }}
            onPointerUp={() => {
              setDragging(false);
            }}
            onDragEnd={() => {
              setDragging(false);
            }}
            className="absolute flex cursor-grab items-center justify-center rounded-full active:cursor-grabbing"
          >
            <motion.div
              animate={{ scale: dragging ? 1 : 0.25 }}
              transition={{ type: "tween", duration: 0.15 }}
              initial={false}
              className="-mt-[15px] h-[33px] w-[33px] rounded-full bg-[#A29CC0]"
            />
          </motion.button>
        </div>
      </div>
      <div className="mt-[11px] flex justify-between">
        <motion.p
          className="absolute left-0 text-[11px] font-medium tabular-nums tracking-wide text-white/20"
          animate={{ y: dragging && progress < 12 ? 15 : 0 }}
        >
          {timecode}
        </motion.p>
        <p className="pointer-events-none mx-auto mt-1 text-xs text-gray-400">
          Music player
        </p>
        <motion.p
          className="absolute right-0 text-[11px] font-medium tabular-nums tracking-wide text-white/20"
          animate={{ y: dragging && progress > 85 ? 15 : 0 }}
        >
          -{timecodeRemaining}
        </motion.p>
      </div>
    </div>
  );
}

export default ProgressBar;
