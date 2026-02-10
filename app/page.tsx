import Header from "@/components/header"
import Hero from "@/components/hero"
import ProjectsSection from "@/components/projects-section"
import StorySection from "@/components/story-section"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectsSection />
        <StorySection />
      </main>
      <Footer />
    </>
  )
}
