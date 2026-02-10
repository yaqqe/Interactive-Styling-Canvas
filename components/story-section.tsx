export default function StorySection() {
  return (
    <section id="story" className="px-6 py-20 max-w-4xl mx-auto lg:px-8">
      <div className="flex items-center mb-12">
        <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground font-sans">
          My Story
        </h2>
        <div className="h-px flex-1 ml-6 bg-border" />
      </div>

      <div className="flex flex-col gap-6 text-base md:text-lg leading-relaxed text-foreground/80 font-sans">
        <p>
          {"I grew up shadowing my mother's work as a Chief Designer of Handicrafts in Kashmir, India. Navigating life amidst constant lockdowns and communication blackouts, I learned resourcefulness and discovered design as a way of life."}
        </p>
        <p>
          {"This philosophy now drives me to craft products and tools that truly make a difference. I'm a product designer, technologist, and storyteller who believes that the most impactful design comes from deeply understanding the people it serves."}
        </p>
        <p>
          {"From building AI-powered marketplaces to redesigning airline call centers, I bring a blend of empathy, strategy, and technical fluency to every project I work on."}
        </p>
      </div>
    </section>
  )
}
