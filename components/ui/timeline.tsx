"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useRef } from "react";

interface TimelineEntryData {
  title: string;
  content: React.ReactNode;
}

const TimelineEntry = ({ item }: { item: TimelineEntryData }) => {
  const entryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: entryScrollYProgress } = useScroll({
    target: entryRef,
    offset: ["start end", "start center"],
  });
  const underlineWidth = useTransform(entryScrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={entryRef}
      className="flex flex-col items-center justify-center pt-10 md:pt-20"
    >
      <div className="flex justify-start md:gap-10 w-full max-w-4xl">
        <div className="sticky flex-col md:flex-row z-40 items-center top-40 self-start hidden md:flex">
          <div className="flex items-center gap-6">
            <span className="inline-block h-4 w-4 rounded-full bg-white/10 backdrop-blur-[2px] ring-1 ring-inset ring-white/10"></span>
            <div className="relative inline-block">
              <h3 className="text-xl md:text-5xl font-bold text-mute">
                {item.title}
              </h3>
              <motion.span 
                style={{ width: underlineWidth }}
                className="absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-tealLux to-royal"/>
            </div>
          </div>
        </div>

        <div className="relative pl-20 pr-4 md:pl-4 w-full">
          <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-mute">
            {item.title}
          </h3>
          {item.content}{" "}
        </div>
      </div>
    </div>
  )
}

export const Timeline = ({ data }: { data: TimelineEntryData[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, ref.current?.offsetHeight ?? 0]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
        <h2 className="text-5xl font-serif font-bold -tracking-wider text-center mb-4 text-white">
          Our Core Services
        </h2>
        <p className="text-center mb-16 font-sans leading-relaxed text-ink">
          Kindly initiate contact to detail your requirements, and we will evaluate our capacity to assist you.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <TimelineEntry key={index} item={item} />
        ))}
        <div
          style={{
            height: ref.current?.offsetHeight,
          }}
          className="absolute md:left-4 left-4 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent from-[0%] via-mute/30 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-royal via-royal2 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}; 