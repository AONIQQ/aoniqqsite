"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type TimelineItem = {
  id: number;
  title: string;
  date?: string;
  content: string;
  category?: string;
  icon?: React.ElementType;
  relatedIds?: number[];
  status?: "completed" | "in-progress" | "pending";
  energy?: number;
};

interface TimelineProps {
  data: TimelineItem[];
}

export const Timeline = ({ data }: TimelineProps) => {
  return (
    <div className="space-y-12 px-4">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-5xl font-display font-bold text-white">
          Our Core Services
        </h2>
        <p className="text-lg leading-relaxed text-ink">
         Click on the icons to learn more about our services.
        </p>
      </div>
      <RadialOrbitalTimeline timelineData={data} />
    </div>
  );
};

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [orbitRadius, setOrbitRadius] = useState<number>(180);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const centerOffset = { x: 0, y: 0 };
  const viewMode: "orbital" = "orbital";

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  useEffect(() => {
    const updateRadius = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      const nextRadius = width < 640 ? Math.max(width * 0.32, 120) : 210;
      setOrbitRadius(nextRadius);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem?.relatedIds ?? [];
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = { ...prev };
      Object.keys(newState).forEach((key) => {
        const numericKey = Number(key);
        if (numericKey !== id) {
          newState[numericKey] = false;
        }
      });

      const isCurrentlyExpanded = !!prev[id];
      newState[id] = !isCurrentlyExpanded;

      if (!isCurrentlyExpanded) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    if (!autoRotate || viewMode !== "orbital" || timelineData.length < 2) {
      return;
    }

    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => {
        const newAngle = (prev + 0.3) % 360;
        return Number(newAngle.toFixed(3));
      });
    }, 50);

    return () => clearInterval(rotationTimer);
  }, [autoRotate, viewMode, timelineData.length]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = Math.max(timelineData.length, 1);
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number, radius: number) => {
    const safeTotal = Math.max(total, 1);
    const angle = ((index / safeTotal) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  if (!timelineData.length) {
    return null;
  }

  return (
    <div
      className="relative mx-auto flex min-h-[960px] w-full max-w-5xl flex-col items-center justify-center overflow-visible rounded-3xl border border-white/10 bg-gradient-to-b from-[#050505] via-[#090909] to-[#0f0f0f] px-6 py-24 text-white sm:min-h-[600px] sm:px-10"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-[720px] w-full items-center justify-center px-4 sm:h-[440px] sm:px-8">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <Image
            src="/images/Finalaoniqqlogo.png"
            alt="Aoniqq logo"
            width={96}
            height={96}
            className="pointer-events-none select-none object-contain"
            priority
          />

          <div className="absolute h-96 w-96 rounded-full border border-white/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(
              index,
              timelineData.length,
              orbitRadius
            );
            const isExpanded = !!expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = !!pulseEffect[item.id];
            const Icon = item.icon ?? Zap;
            const energy = item.energy ?? 60;
            const relatedIds = item.relatedIds ?? [];

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute -inset-1 rounded-full ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width: `${energy * 0.5 + 40}px`,
                    height: `${energy * 0.5 + 40}px`,
                    left: `-${(energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isExpanded
                      ? "scale-150 border-white bg-white text-black shadow-lg shadow-white/30"
                      : isRelated
                      ? "border-white bg-white/50 text-black"
                      : "border-white/40 bg-black text-white"
                  }`}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`absolute top-24 left-1/2 -translate-x-1/2 max-w-[200px] px-3 text-center text-xs font-semibold leading-tight tracking-wider transition-all duration-300 sm:top-16 ${
                    isExpanded ? "scale-110 text-white" : "text-white/70"
                  }`}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 w-64 max-w-[80vw] -translate-x-1/2 overflow-visible border-white/30 bg-black/90 backdrop-blur-lg shadow-xl shadow-white/10">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50"></div>
                    <CardHeader className="pb-2">
                      {!!item.date && item.date.toLowerCase() !== "ongoing" && (
                        <span className="text-xs font-mono text-white/50">
                          {item.date}
                        </span>
                      )}
                      <CardTitle className="mt-2 text-sm">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-white/80">
                      <p>{item.content}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}