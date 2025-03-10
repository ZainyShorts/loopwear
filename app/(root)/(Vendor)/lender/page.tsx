// import TopBanner from '@/app/components/global/top-banner'
// import { SubHeader } from '@/app/components/global/sub-header'
// import { Link } from 'lucide-react'
// import Image from 'next/image'
// import React from 'react'
// const page = () => {
//   return (
//     <>
//        <TopBanner back={true} />
//        <SubHeader/>
//        <div className=" mx-auto py-12 text-center space-y-8">
//         <Link
//           href="/become-lender"
//           className="inline-block px-8 py-3 text-xl font-medium text-white bg-[#5F2F16] rounded-lg hover:bg-[#5F2F16]/90 transition-colors"
//         >
//           Become a Lender
//         </Link>

//         <h2 className="text-2xl  font-medium text-[#5F2F16]">Join the community of Happy Lenders</h2>

//         <div className="mt-8 rounded-lg overflow-hidden">
//           <Image
//             src="https://sjc.microlink.io/qRSDXA4ekBoM4rMuROGEUPYXR0z0rwuzd1v4axWc5adwZFbR5wnCtFj9Ba-6vcD2rCdKKgdKpbiIATYTkvtUQg.jpeg"
//             alt="Clothing Collection"
//             width={1200}
//             height={600}
//             className="w-full "
//           />
//         </div>
//       </div>
//     </>
//   )
// }

// export default page


// import Image from "next/image"
// import { Button } from "@/components/ui/button"

// export default function ClothingLendingPage() {
//   return (
//     <div className="min-h-screen" style={{ backgroundColor: "#E2CCAC47" }}>
//       <div className="container mx-auto px-4 py-12 flex flex-col items-center">
//         <div className="max-w-4xl w-full flex flex-col items-center space-y-8">
//           {/* Header with button */}
//           <Button
//             className="text-xl font-medium px-8 py-6 rounded-full text-white"
//             style={{ backgroundColor: "#5F2F16" }}
//           >
//             Become a Lender
//           </Button>

//           {/* Tagline */}
//           <h1 className="text-3xl md:text-4xl font-medium text-center text-[#5F2F16]">
//             Join the community of Happy Lenders
//           </h1>

//           {/* Main image */}
//           <div className="w-full mt-6 rounded-lg overflow-hidden shadow-lg">
//             <Image
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-08%20at%2013.53.45-wIPsYiEoGv7EiMpifXWgoeX3U9Kyaf.png"
//               alt="Colorful clothing items on wooden racks"
//               width={1200}
//               height={600}
//               className="w-full object-cover"
//               priority
//             />
//           </div>

//           {/* Features section */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//             <FeatureCard
//               title="Share Your Style"
//               description="Lend your unique fashion pieces and help others discover new styles while earning extra income."
//             />
//             <FeatureCard
//               title="Sustainable Fashion"
//               description="Join our eco-friendly community and help reduce fashion waste through collaborative consumption."
//             />
//             <FeatureCard
//               title="Build Connections"
//               description="Connect with fashion enthusiasts in your area and become part of our growing community."
//             />
//           </div>

//           {/* CTA section */}
//           <div className="mt-12 text-center">
//             <h2 className="text-2xl font-medium mb-4 text-[#5F2F16]">Ready to start lending?</h2>
//             <Button
//               className="text-lg font-medium px-8 py-6 rounded-full text-white"
//               style={{ backgroundColor: "#5F2F16" }}
//             >
//               Create Your Account
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function FeatureCard({ title, description }: { title: string; description: string }) {
//   return (
//     <div className="bg-white/80 p-6 rounded-lg shadow-md border border-[#5F2F16]/20">
//       <h3 className="text-xl font-medium mb-2 text-[#5F2F16]">{title}</h3>
//       <p className="text-[#5F2F16]/80">{description}</p>
//     </div>
//   )
// }

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, RefreshCw, Users } from "lucide-react"
import StepsGuide from "./component/steps-guide"
import LenderPolicy from "./component/lender-policy"
import FooterBanner from "@/app/components/global/footer-banner"
import TopBanner from "@/app/components/global/top-banner"
import { SubHeader } from "@/app/components/global/sub-header"

export default function LandingPageWithBenefits() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#E2CCAC47" }}>
       <TopBanner back={true} />
        <SubHeader/>
      <div className=" mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="flex flex-col items-center text-center mb-16">
          <Button
            className="text-xl font-medium px-8 py-6 rounded-full text-white mb-8"
            style={{ backgroundColor: "#5F2F16" }}
          >
            Become a Lender
          </Button>

          <h1 className="text-3xl md:text-4xl font-medium text-[#5F2F16] mb-12">Join the community of Happy Lenders</h1>

          <div className="w-full max-w-5xl rounded-lg overflow-hidden shadow-xl ">
            <Image
              src="https://res.cloudinary.com/dklqbx5k0/image/upload/v1741397248/kjomp2cfy2xowpmjjwbj.png"
              alt="Colorful clothing items on wooden racks"
              width={1200}
              height={600}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Benefits section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-medium text-center text-[#5F2F16] mb-10">
            Benefits of Becoming a Lender
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-[#5F2F16] p-2 rounded-full text-white mt-1">
                <RefreshCw size={20} />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-[#5F2F16]">Circular Fashion</h3>
                <p className="text-[#5F2F16]/80">
                  Participate in the circular economy by extending the lifecycle of your clothing items.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#5F2F16] p-2 rounded-full text-white mt-1">
                <Leaf size={20} />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-[#5F2F16]">Eco-Friendly</h3>
                <p className="text-[#5F2F16]/80">
                  Reduce fashion waste and environmental impact by sharing instead of buying new.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#5F2F16] p-2 rounded-full text-white mt-1">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-[#5F2F16]">Community</h3>
                <p className="text-[#5F2F16]/80">
                  Connect with like-minded fashion enthusiasts in your local community.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#5F2F16] p-2 rounded-full text-white mt-1">
                <ArrowRight size={20} />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-[#5F2F16]">Extra Income</h3>
                <p className="text-[#5F2F16]/80">
                  Turn your closet into a source of passive income by lending items you don't wear often.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Guide */}
        <StepsGuide />

        {/* Lender Policy */}
        <LenderPolicy />

        {/* CTA section */}
        <div className="text-center max-w-2xl mx-auto py-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-4 text-[#5F2F16]">Ready to share your wardrobe?</h2>
          <p className="text-[#5F2F16]/80 mb-8">
            Join thousands of lenders who are already sharing their style and making a difference.
          </p>
          <Button
            className="text-lg font-medium px-8 py-6 rounded-full text-white"
            style={{ backgroundColor: "#5F2F16" }}
          >
            Become a Lender Today
          </Button>
        </div>
      </div>

      {/* Footer Banner */}
      <FooterBanner />
    </div>
  )
}

