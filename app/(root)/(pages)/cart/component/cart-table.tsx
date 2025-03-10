import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function CartTable() {
  return (
    <div className=" w-2/3 flex flex-col items-center justify-center px-4 py-16 bg-white/90">
      <h1 className="text-4xl font-serif font-bold mb-12 tracking-wide">SHOPPING CART</h1>

      <ShoppingCart className="w-24 h-24 mb-8" />

      <h2 className="text-3xl font-serif mb-6">Your cart is empty!</h2>

      <div className="max-w-md text-center space-y-2 mb-8">
        <p>Before proceed to checkout you must add some products to your shopping cart.</p>
        <p>You will find a lot of interesting products on our &quot;Shop&quot; page.</p>
      </div>

      <Link
        href="/"
        className="px-6 py-3 bg-[#6E391D] text-white rounded-xl hover:bg-[#542D18] transition-colors duration-200"
      >
        Return To Shop
      </Link>
    </div>
  )
}

