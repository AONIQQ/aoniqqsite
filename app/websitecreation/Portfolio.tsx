'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

interface Project {
  src: string;
  fallbackImage: string;
  alt: string;
  title: string;
  description: string;
  url: string;
}

const projects: Project[] = [
  {
    src: "/videos/Fastrackedu.mp4",
    fallbackImage: "/images/fastrack.png",
    alt: "Fastrack Website",
    title: "Fastrack",
    description: "A training business in the education sector.",
    url: "https://www.fastrack.school"
  },
  {
    src: "/videos/WSV.mp4",
    fallbackImage: "/images/fff.png",
    alt: "Wall Street Vision Website",
    title: "Wall Street Vision",
    description: "A stock trading program.",
    url: "https://www.Wallstreetvision.net"
  },
  {
    src: "/videos/Weaksaucephilly.mp4",
    fallbackImage: "/images/weak.png",
    alt: "Weaksauce Website",
    title: "Weaksauce",
    description: "A Hot Sauce Brand.",
    url: "https://www.weaksaucephilly.com"
  },
  {
    src: "/videos/dpe.mp4",
    fallbackImage: "/images/found.png",
    alt: "DPE Foundation Website",
    title: "DPE Foundation",
    description: "A Nonprofit Organization.",
    url: "https://dpefoundation.org/"
  },
  {
    src: "/videos/marketvision.mp4",
    fallbackImage: "/images/mkt.png",
    alt: "Market Vision Website",
    title: "Market Vision",
    description: "A marketing service for scaling with tiktok ads.",
    url: "https://www.marketvision.net"
  },
  {
    src: "/videos/picozzi.mp4",
    fallbackImage: "/images/joe.png",
    alt: "VotePicozzi Website",
    title: "VotePicozzi",
    description: "A political campaign website.",
    url: "https://www.Votepicozzi.com"
  },
  {
    src: "/videos/remotetutoring.mp4",
    fallbackImage: "/images/rem.png",
    alt: "Remote Tutoring Website",
    title: "Remote Tutoring",
    description: "A chemistry tutoring business.",
    url: "https://www.remotetutoring.com"
  }
]

export default function Portfolio() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>(new Array(projects.length).fill(false))
  const [videoErrors, setVideoErrors] = useState<boolean[]>(new Array(projects.length).fill(false))
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const loadVideos = () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const handleLoad = () => {
            setVideosLoaded(prev => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }

          const handleError = () => {
            console.warn(`Failed to load video: ${projects[index].src}`)
            setVideoErrors(prev => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }

          video.addEventListener('loadeddata', handleLoad)
          video.addEventListener('error', handleError)

          // Preload the video
          video.load()

          return () => {
            video.removeEventListener('loadeddata', handleLoad)
            video.removeEventListener('error', handleError)
          }
        }
      })
    }

    loadVideos()
  }, [])

  const handleMouseEnter = (index: number) => {
    setHoveredService(index)
    const video = videoRefs.current[index]
    if (video && videosLoaded[index] && !videoErrors[index]) {
      video.play().catch(error => {
        console.warn(`Autoplay prevented for video ${index}:`, error)
        setVideoErrors(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      })
    }
  }

  const handleMouseLeave = (index: number) => {
    setHoveredService(null)
    const video = videoRefs.current[index]
    if (video && !videoErrors[index]) {
      video.pause()
      video.currentTime = 0
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
          className="relative block"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
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
              <div className="relative z-10 w-full aspect-video mb-4 overflow-hidden rounded-lg bg-blue-900/40">
                {!videoErrors[index] ? (
                  <video
                    ref={el => { videoRefs.current[index] = el }}
                    src={project.src}
                    loop
                    muted
                    playsInline
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      videosLoaded[index] ? 'opacity-100' : 'opacity-0'
                    }`}
                    poster={project.fallbackImage}
                    onError={() => {
                      setVideoErrors(prev => {
                        const newState = [...prev]
                        newState[index] = true
                        return newState
                      })
                    }}
                  />
                ) : (
                  <div className="w-full h-full">
                    <Image
                      src={project.fallbackImage || "/placeholder.svg"}
                      alt={project.alt}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover"
                      onError={() => {
                        console.warn(`Failed to load fallback image for ${project.title}`)
                      }}
                    />
                  </div>
                )}
                {!videosLoaded[index] && !videoErrors[index] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{project.title}</h3>
              <p className="text-center text-gray-300">
                {project.description}
              </p>
            </CardContent>
          </Card>
        </motion.a>
      ))}
    </div>
  )
}