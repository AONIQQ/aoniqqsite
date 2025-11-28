import { cn } from "@/lib/utils"
import { TestimonialMarqueeCard } from "./testimonial-marquee-card"

interface Testimonial {
  id: number
  body: string
  author: string
  role: string
}

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[]
  className?: string
}

export function TestimonialsMarquee({ 
  testimonials,
  className 
}: TestimonialsMarqueeProps) {
  return (
    <section className={cn(
      "relative py-12",
      className
    )}>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:250s]">
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {[...Array(6)].map((_, setIndex) => (
              testimonials.map((testimonial) => (
                <TestimonialMarqueeCard 
                  key={`${setIndex}-${testimonial.id}`}
                  body={testimonial.body}
                  author={testimonial.author}
                  role={testimonial.role}
                />
              ))
            ))}
          </div>
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {[...Array(6)].map((_, setIndex) => (
              testimonials.map((testimonial) => (
                <TestimonialMarqueeCard 
                  key={`duplicate-${setIndex}-${testimonial.id}`}
                  body={testimonial.body}
                  author={testimonial.author}
                  role={testimonial.role}
                />
              ))
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-obsidian sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-obsidian sm:block" />
      </div>
    </section>
  )
}
