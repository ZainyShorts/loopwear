import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Main Footer Content */}
      <div className="bg-[#F1E4D1] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-8">Got Plans? Just #LoopItOn</h2>
          <div className="text-[#6E391D] font-serif text-lg md:text-2xl space-y-2">
            <p>Don't buy something you'll only wear only once or twice - Rent</p>
            <p>dresses at a fraction of the price!</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#6E391D] py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="https://www.loopwear.com"
            className="text-white hover:text-white/90 transition-colors font-serif"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.loopwear.com
          </Link>
        </div>
      </div>
    </footer>
  )
}

