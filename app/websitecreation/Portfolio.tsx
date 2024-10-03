'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

interface Project {
  src: string;
  alt: string;
  title: string;
  description: string;
  url: string;
}

const projects: Project[] = [
  {
    src: "/videos/Fastrackedu.mp4",
    alt: "Fastrack Website",
    title: "Fastrack",
    description: "A training business in the education sector.",
    url: "https://www.fastrack.school"
  },
  {
    src: "/videos/wsv.mp4",
    alt: "Wall Street Vision Website",
    title: "Wall Street Vision",
    description: "A stock trading program.",
    url: "https://www.Wallstreetvision.net"
  },
  {
    src: "/videos/Weaksaucephilly.mp4",
    alt: "Weaksauce Website",
    title: "Weaksauce",
    description: "A Hot Sauce Brand.",
    url: "https://www.weaksaucephilly.com"
  },
  {
    src: "/videos/DPE.mp4",
    alt: "DPE Foundation Website",
    title: "DPE Foundation",
    description: "A Nonprofit Organization.",
    url: "https://www.dpefoundation.org"
  },
  {
    src: "/videos/Marketvision.mp4",
    alt: "Market Vision Website",
    title: "Market Vision",
    description: "A marketing service for scaling with tiktok ads.",
    url: "https://www.marketvision.net"
  },
  {
    src: "/videos/Picozzi.mp4",
    alt: "VotePicozzi Website",
    title: "VotePicozzi",
    description: "A political campaign website.",
    url: "https://www.Votepicozzi.com"
  },
  {
    src: "/videos/Remotetutoring.mp4",
    alt: "Remote Tutoring Website",
    title: "Remote Tutoring",
    description: "A chemistry tutoring business.",
    url: "https://www.remotetutoring.com"
  }
]

export default function Portfolio() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>(new Array(projects.length).fill(false))
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const loadVideos = () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          video.load()
          video.addEventListener('loadeddata', () => {
            setVideosLoaded(prev => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          })
        }
      })
    }

    loadVideos()

    // Cleanup function
    return () => {
      videoRefs.current.forEach(video => {
        if (video) {
          video.removeEventListener('loadeddata', () => {})
        }
      })
    }
  }, [])

  const handleMouseEnter = (index: number) => {
    setHoveredService(index)
    if (videoRefs.current[index] && videosLoaded[index]) {
      videoRefs.current[index]?.play().catch(error => console.log("Autoplay was prevented:", error))
    }
  }

  const handleMouseLeave = (index: number) => {
    setHoveredService(null)
    if (videoRefs.current[index]) {
      videoRefs.current[index]?.pause()
      videoRefs.current[index]!.currentTime = 0
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <motion.a 
          key={index} 
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 text-white border-2 border-blue-400/50 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl h-full overflow-hidden">
            <CardContent className="flex flex-col items-center p-6 h-full relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredService === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10 w-full aspect-video mb-4 overflow-hidden rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <video
                    ref={el => { if (el) videoRefs.current[index] = el }}
                    src={project.src}
                    loop
                    muted
                    playsInline
                    className={`w-full h-full object-contain ${videosLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                    aria-label={project.alt}
                  />
                  {!videosLoaded[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-900/40">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{project.title}</h3>
              <p className="text-center text-gray-300">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {project.description}
                </motion.span>
              </p>
            </CardContent>
          </Card>
        </motion.a>
      ))}
    </div>
  )
}