export default function Footer() {
  return (
    <footer className="px-6 py-16 max-w-6xl mx-auto lg:px-8 border-t border-border">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <div className="flex flex-col gap-3">
          <p className="font-serif text-xl text-foreground">
            {"Let's work together."}
          </p>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            If you would like to discuss a project or just say hi, I am always
            happy to chat.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="mailto:kabeerandrabi@gmail.com"
            className="text-sm text-foreground hover:text-muted-foreground transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/kabeerandrabi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-muted-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <p className="mt-16 text-xs text-muted-foreground font-sans">
        {"Kabeer Andrabi \u00A9 2026"}
      </p>
    </footer>
  )
}
