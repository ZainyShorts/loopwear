import Image from "next/image"
import Link from "next/link"

export default function AnnouncementBlog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="relative aspect-[4/3] bg-black rounded-3xl overflow-hidden">
          <Image
            src="https://cdn.prod.website-files.com/66912739c6023a7f5b275a1b/677a501883439ccc58b35d79_Sintra%20AI%20Goes%20Mobile_%20Introducing%20the%20iOS%20App%20%E2%80%93%20Manage%20Your%20AI%20Workforce%20Anytime%2C%20Anywhere.png"
            alt="Sintra AI Mobile App"
            width={800}
            height={600}
            className="object-fit"
          />
        </div>

        {/* Content Section */}
        <Link href={'/blog/latest'} className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-600">Product</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Sintra AI Goes Mobile: Introducing the iOS App – Manage Your AI Workforce Anytime, Anywhere
            </h1>
            <p className="text-xl text-gray-600">
              Sintra Mobile App: Take Control of Your Productivity Wherever You Are
            </p>
            <time className="block text-sm text-gray-500">
              January 5, 2025
            </time>
          </div>
        </Link>
      </div>
    </div>
  )
}
