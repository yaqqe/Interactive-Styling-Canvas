import Link from "next/link"

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-6 pt-24 pb-16 max-w-4xl mx-auto lg:px-8">
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-foreground text-balance leading-[1.05]">
        kabeer andrabi.
      </h1>
      <p className="mt-6 text-base md:text-lg text-muted-foreground tracking-wide uppercase font-sans">
        product designer &middot; technologist &middot; storyteller
      </p>
      <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/80 font-sans">
        {"I grew up shadowing my mother's work as a Chief Designer of Handicrafts and navigating life amidst constant lockdowns and communication blackouts, where I learned "}
        <em className="font-serif text-foreground not-italic font-medium">resourcefulness</em>
        {" and "}
        <em className="font-serif text-foreground not-italic font-medium">design as a way of life</em>
        {". Now, this philosophy drives me to craft products and tools that truly make a difference."}
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a href="#story" className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
          My Story
        </a>
        <a
          href="mailto:kabeerandrabi@gmail.com"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium border border-border text-foreground rounded-full hover:bg-secondary transition-colors"
        >
          Get in Touch
        </a>
        <a
          href="https://www.linkedin.com/in/kabeerandrabi/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium border border-border text-foreground rounded-full hover:bg-secondary transition-colors"
        >
          LinkedIn
          <svg className="ml-1.5 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </a>
      </div>
    </section>
  )
}
