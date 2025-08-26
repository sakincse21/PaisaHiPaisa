import { Hero } from "@/components/modules/Home/Hero"
import HomeFeature from "@/components/modules/Home/HomeFeature"
import TestimonialCarousel from "@/components/modules/Home/TestimonialCarousel"

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
        <Hero />
        <HomeFeature />
        <TestimonialCarousel />
    </div>
  )
}

export default Home