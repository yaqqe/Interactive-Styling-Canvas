import ProjectCard from "./project-card"

const projects = [
  {
    title: "Ripple's Payment Innovation",
    description:
      "Improved payment search and download, and introduced a dashboard for automated reporting and reconciliation.",
    impact: "Cut down operation time by around 80%",
    tags: ["Product Design", "Strategy", "Visual Design", "C-Suite Presentation"],
    imageSrc: "/projects/ripple.jpg",
    imageAlt: "Ripple payment innovation dashboard showing search and reporting features",
  },
  {
    title: "WeaveWorks",
    description:
      "Developed an AI-powered 3D marketplace, connecting traditional Kashmiri artisans with the contemporary design world.",
    impact: "Empowering 178 artisans with a global market and tech",
    tags: ["Passion Project", "Research", "Conversational AI", "Design", "Development"],
    imageSrc: "/projects/weaveworks.jpg",
    imageAlt: "WeaveWorks AI-powered 3D marketplace for Kashmiri artisans",
  },
  {
    title: "Air Canada Performance Analytics",
    description:
      "Developed an automated performance data library for Air Canada, offering real-time customer insights for an analytics dashboard.",
    impact: "Enhanced site monitoring through intuitive data visualization",
    tags: ["Data Visualization", "Dashboard Development", "User Analytics"],
    imageSrc: "/projects/aircanada.jpg",
    imageAlt: "Air Canada performance analytics dashboard with data visualizations",
  },
  {
    title: "Amadeus's Call Center Transformation",
    description:
      "Redesigned the airline call center experience for faster customer service and uncovered a new user research channel.",
    impact: "Reduced agent handling time by 10 minutes",
    tags: ["UX Design", "Research", "B2B SaaS", "Visual Design", "Design System"],
    imageSrc: "/projects/amadeus.jpg",
    imageAlt: "Amadeus call center redesign interface",
  },
  {
    title: "Decoding Data Capitalism",
    description:
      "Designed a speculative XR headset to challenge surveillance capitalism and created an immersive experience for 120 attendees.",
    impact: "Raised awareness about data privacy and security",
    tags: ["XR Design", "Speculative Design", "3D Printing", "Video Production"],
    imageSrc: "/projects/datacapitalism.jpg",
    imageAlt: "Speculative XR headset design challenging data capitalism",
  },
  {
    title: "M.I.T Media Lab XR Hackathon",
    description:
      "Developed Failtopia, a multiplayer experience encouraging students to share failures, learn collaboratively, and grow.",
    impact: "Won the Grand Prize, securing 1st place out of 70 teams",
    tags: ["VR Design", "Product Management", "Video Production"],
    imageSrc: "/projects/mit.jpg",
    imageAlt: "Failtopia VR experience from MIT Media Lab hackathon",
  },
]

export default function ProjectsSection() {
  return (
    <section id="work" className="px-6 py-20 max-w-6xl mx-auto lg:px-8">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground font-sans">
          Selected Work
        </h2>
        <div className="h-px flex-1 ml-6 bg-border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}
