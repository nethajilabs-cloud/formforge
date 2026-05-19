import { Navbar } from './_components/Navbar'
import { Hero } from './_components/Hero'
import { Features } from './_components/Features'
import { CodeShowcase } from './_components/CodeShowcase'
import { CtaBanner } from './_components/CtaBanner'
import { Footer } from './_components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CodeShowcase />
      <CtaBanner />
      <Footer />
    </>
  )
}
