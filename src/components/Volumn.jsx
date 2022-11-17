/* eslint-disable prettier/prettier */
import {
    motion,
    useDragControls,
    useMotionTemplate,
    useMotionValue
} from "framer-motion";
import { useEffect, useRef } from "react";
import { FaVolumeOff, FaVolumeUp } from "react-icons/fa";

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function getXFromProgress({ progress, containerRef }) {
  const bounds = containerRef.current.getBoundingClientRect();

  return progress * bounds.width;
}

function getProgressFromX({ x, containerRef }) {
  const bounds = containerRef.current.getBoundingClientRect();
  const progress = (x - bounds.x) / bounds.width;

  return clamp(progress, 0, 1);
}

function Volume() {
  const dragControls = useDragControls();
  const constraintsRef = useRef();
  const scrubberRef = useRef();
  const fullBarRef = useRef();
  const volume = useMotionValue(51.5);
  const width = useMotionTemplate`${volume}%`;
  const scrubberX = useMotionValue(0);
  const scrubberSize = 20;

  useEffect(() => {
    const initialVolume = getXFromProgress({
      containerRef: fullBarRef,
      progress: volume.get() / 100,
    });
    scrubberX.set(initialVolume);
  }, [scrubberX, volume]);

  return (
    <div className="mx-6 mt-2 flex items-center justify-between">
      <FaVolumeOff size={20} />

      <div className="w-full px-[14px]">
        <div
          data-test="slider"
          className="relative mx-3 flex flex-1 items-center"
          style={{
            marginLeft: -scrubberSize / 2,
            marginRight: -scrubberSize / 2,
          }}
        >
          <div
            data-test="slider-constraints"
            ref={constraintsRef}
            className="absolute inset-x-0 h-[3px]"
          />

          <div
            data-test="slider-background-container"
            className="absolute flex items-center"
            style={{ left: scrubberSize / 2, right: scrubberSize / 2 }}
          >
            <div
              ref={fullBarRef}
              data-test="slider-clickable-area"
              className="absolute inset-x-0 flex cursor-grab items-center py-2"
              onPointerDown={(event) => {
                const newVolume = getProgressFromX({
                  containerRef: fullBarRef,
                  x: event.clientX,
                });
                dragControls.start(event, { snapToCursor: true });
                volume.set(newVolume * 100);
              }}
            >
              <div
                data-test="slider-background"
                className="h-[3px] w-full rounded-full bg-[#5A526F]"
              />
            </div>

            <motion.div
              data-test="slider-current-progress"
              className="pointer-events-none absolute h-[3px] rounded-full bg-[#A29CC0]"
              style={{ width }}
            />
          </div>

          <motion.button
            ref={scrubberRef}
            style={{
              x: scrubberX,
              width: scrubberSize,
              height: scrubberSize,
            }}
            drag="x"
            dragConstraints={constraintsRef}
            dragControls={dragControls}
            dragElastic={0}
            dragMomentum={false}
            onDrag={() => {
              const scrubberBounds =
                scrubberRef.current.getBoundingClientRect();
              const middleOfScrubber =
                scrubberBounds.x + scrubberBounds.width / 2;
              const newVolume = getProgressFromX({
                containerRef: fullBarRef,
                x: middleOfScrubber,
              });
              volume.set(newVolume * 100);
            }}
            className="cursor-grab rounded-full bg-white active:cursor-grabbing"
          />
        </div>
      </div>

      <FaVolumeUp size={20} />
    </div>
  );
}
export default Volume;
