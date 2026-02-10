"use client"

import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  impact: string
  tags: string[]
  imageSrc: string
  imageAlt: string
}

export default function ProjectCard({
  title,
  description,
  impact,
  tags,
  imageSrc,
  imageAlt,
}: ProjectCardProps) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary mb-5">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-lg font-medium text-foreground leading-snug mb-2 font-sans">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed mb-3 font-sans">
        {description}
      </p>

      <p className="text-sm font-medium text-foreground font-sans">
        <span className="text-muted-foreground font-normal">Impact: </span>
        {impact}
      </p>
    </article>
  )
}
