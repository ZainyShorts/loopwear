import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"
import ProductsSection from "./components/Home/ui/products-section"
import VideoSection from "./components/Home/ui/video-section"
import AboutSection from "./components/Home/ui/about-section"
import LoopWearBanner from "./components/Home/ui/loopwear-banner"
import TopBanner from "./components/global/top-banner"
import HeaderDropdown from "./components/global/header-dropdwon"
import { logo } from "@/lib/data"

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Top Banner */}
        <TopBanner />

        {/* Header */}
        <header className="bg-[#f9f3eb] py-3 px-4 sm:py-4 sm:px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">Loop</span>
                <img src={logo || "/placeholder.svg"} alt="Loop Wear Logo" className="h-10 sm:h-12 md:h-16 w-auto" />
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">Wear</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button aria-label="Search" className="p-1">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <Link href={"/cart"} aria-label="Cart" className="p-1">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            {/* Replaced logout button with dropdown */}
            <HeaderDropdown />
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-[#f9f3eb] border-b border-[#E2CCAC87] py-2 px-4 sm:px-6 md:px-12 overflow-x-auto">
          <ul className="flex justify-center gap-2 sm:gap-4 md:gap-8 min-w-max mx-auto">
            <li>
              <Link
                href="/"
                className="px-2 sm:px-4 py-1 bg-[#A664415E] border-2 border-black rounded-full text-[#6d4534] text-sm sm:text-base whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products?type=rent"
                className="px-2 sm:px-4 py-1 underline text-sm sm:text-base whitespace-nowrap"
              >
                Renter
              </Link>
            </li>
            <li>
              <Link
                href="/products?type=buy"
                className="px-2 sm:px-4 py-1 underline text-sm sm:text-base whitespace-nowrap"
              >
                Lender
              </Link>
            </li>
            <li>
              <Link href="/login" className="px-2 sm:px-4 py-1 underline text-sm sm:text-base whitespace-nowrap">
                Register
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 bg-[#f0e8d9] overflow-hidden">
          <div className="h-full flex flex-col md:flex-row items-center">
            {/* Left Content */}
            <div className="w-full md:w-2/5 p-4 sm:p-6 md:p-12 text-center md:text-left flex flex-col justify-center">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-3 md:mb-4">
                Fashion That Circulates, Style That Lasts.
              </h1>
              <p className="text-[#6d4534] mb-6 md:mb-8 text-base sm:text-lg">
                Rent. Wear. Return. Repeat — Sustainable Fashion at Your Fingertips.
              </p>
              <div>
                <button className="bg-[#6d4534] text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-[#5a3a2c] transition-colors text-sm sm:text-base">
                  Explore Now
                </button>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className="w-full md:w-3/5 h-[50vh] md:h-full relative flex items-end justify-center overflow-hidden">
              <div className="flex h-full w-full">
                {/* Arch 1 */}
                <div className="relative w-[30%] h-full">
                  <div className="absolute bottom-0 w-full h-[85%] rounded-t-full overflow-hidden">
                    <div className="absolute inset-0 bg-[#2a1e17]"></div>
                    <div className="absolute inset-0 flex items-end justify-center">
                      <Image
                        src="https://res.cloudinary.com/dklqbx5k0/image/upload/v1741306556/hibieafdrkpyzq3msduk.png"
                        alt="Fashion model in pink outfit"
                        width={300}
                        height={600}
                        className="object-cover h-full w-full"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Arch 3 */}
                <div className="relative w-[30%] h-full">
                  <div className="absolute bottom-0 w-full h-[90%] rounded-t-full overflow-hidden">
                    <div className="absolute inset-0 bg-[#2a1e17]"></div>
                    <div className="absolute inset-0 flex items-end justify-center">
                      <Image
                        src="https://res.cloudinary.com/dklqbx5k0/image/upload/v1741306566/i13jlkfcjaj0thvcceae.png"
                        alt="Fashion model in brown outfit with red dupatta"
                        width={350}
                        height={700}
                        className="object-cover h-full w-full"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Arch 2 */}
                <div className="relative w-[30%] h-full">
                  <div className="absolute bottom-0 w-full h-[95%] rounded-t-full overflow-hidden">
                    <div className="absolute inset-0 bg-[#2a1e17]"></div>
                    <div className="absolute inset-0 flex items-end justify-center">
                      <Image
                        src="https://res.cloudinary.com/dklqbx5k0/image/upload/v1741306567/mvlwxe7qdijkiuimfklm.png"
                        alt="Fashion model in beige outfit"
                        width={350}
                        height={700}
                        className="object-cover h-full w-full"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ProductsSection />
      <VideoSection />
      <AboutSection />
      <LoopWearBanner />
    </>
  )
}

