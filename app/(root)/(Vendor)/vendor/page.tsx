'use client'
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Menu, ShoppingBag, Plus, FileText, Store, FolderClosed, BadgeCheck, BringToFront } from "lucide-react"
import TopBanner from "@/app/components/global/top-banner"
import { useRouter } from "next/navigation"
import { logo } from "@/lib/data"

export default function VendorPage() {

    const router = useRouter()
    function navigate(path:string){
        router.push(path)
    }
  return (
    <div className="min-h-screen bg-[#fdf6ef]">
      <TopBanner />

      {/* Header with Logo and Navigation */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-black rounded-full w-14 h-14 flex items-center justify-center overflow-hidden">
            <Image
              src={logo}
              alt="Hadeeqa's boutique logo"
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-serif tracking-tight">Hadeeqa's boutique</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-[#6b3419] text-[#6b3419] rounded-full hover:bg-[#6b3419] hover:text-white transition-colors"
          >
            logout
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-[#6b3419]/10 bg-white">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 p-0 rounded-md border border-[#6b3419]/20 shadow-lg bg-white"
            >
              <div className="py-3 px-4 border-b border-[#6b3419]/10">
                <p className="font-medium text-[#6b3419]">LoopWear</p>
              </div>
              <DropdownMenuItem onClick={()=>navigate('/products?type=buy')}  className="py-3 px-4 flex items-center gap-2 cursor-pointer hover:bg-[#6b3419]/10 hover:text-[#6b3419] focus:bg-[#6b3419]/10 focus:text-[#6b3419]">
                <ShoppingBag className="h-4 w-4 text-[#6b3419]" />
                <span>View Products</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>navigate('/add-dress')} className="py-3 px-4 flex items-center gap-2 cursor-pointer hover:bg-[#6b3419]/10 hover:text-[#6b3419] focus:bg-[#6b3419]/10 focus:text-[#6b3419]">
                <Plus className="h-4 w-4 text-[#6b3419]" />
                <span>Add Product</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>navigate('/lender')} className="py-3 px-4 flex items-center gap-2 cursor-pointer hover:bg-[#6b3419]/10 hover:text-[#6b3419] focus:bg-[#6b3419]/10 focus:text-[#6b3419]">
                <FileText className="h-4 w-4 text-[#6b3419]" />
                <span>Vendor Policy</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>navigate('/create-store')} className="py-3 px-4 flex items-center gap-2 cursor-pointer hover:bg-[#6b3419]/10 hover:text-[#6b3419] focus:bg-[#6b3419]/10 focus:text-[#6b3419]">
                <Store className="h-4 w-4 text-[#6b3419]" />
                <span >Create Store</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Vendor Welcome Banner */}
      <div className="w-full bg-[#6b3419] text-white py-10 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif">Welcome To Your Store</h2>
        </div>
      </div>

      {/* Vendor Dashboard */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Extra Earning */}
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center transform transition-transform hover:scale-105">
            <div className="w-24 h-24 mb-6">
            <BringToFront className="h-24 w-24 text-[#6b3419] mb-6" />

            </div>
            <h3 className="text-xl font-serif text-center mb-4 text-[#6b3419]">Extra Dresses = Extra Earning</h3>
            <p className="text-center text-sm leading-relaxed text-gray-700">
              Your preloved dresses may be a treasure that someone might be looking for. Help other people have their
              fairytale events by lending. The best part... not only do you get good deeds for helping, you also earn
              while sitting at home.
            </p>
          </div>

          {/* Closet Space */}
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center transform transition-transform hover:scale-105">
            <div className="w-24 h-24 mb-6">
            <FolderClosed className="h-24 w-24 text-[#6b3419] mb-6" />
            </div>
            <h3 className="text-xl font-serif text-center mb-4 text-[#6b3419]">Who doesn't love more closet space?</h3>
            <p className="text-center text-sm leading-relaxed text-gray-700">
              Heavy and Bridal Wear takes up so much space and is hardly worn thrice. Free your Closet space and earn
              from your extra clothes
            </p>
          </div>

          {/* Lending Process */}
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center transform transition-transform hover:scale-105">
            <div className="w-24 h-24 mb-6">
            <BadgeCheck className="h-24 w-24 text-[#6b3419] mb-6" />
            </div>
            <h3 className="text-xl font-serif text-center mb-4 text-[#6b3419]">Effortless Lending process</h3>
            <p className="text-center text-sm leading-relaxed text-gray-700">
              You can also sell the dress in addition to lending. User-friendly interface and guide help you to manage
              your store without effort and seamlessly lend dresses and manage orders.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-[#6b3419]/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif mb-4 text-[#6b3419]">Ready to start earning?</h3>
          <p className="mb-6 max-w-2xl mx-auto text-gray-700">
            List your first dress today and join our community of fashion entrepreneurs making extra income from their
            wardrobe.
          </p>
          <Button className="bg-[#6b3419] hover:bg-[#5a2c15] text-white px-8 py-6 rounded-full text-lg">
            Add Your First Product
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#6b3419] py-10 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">© 2025 Hadeeqa's Boutique. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

