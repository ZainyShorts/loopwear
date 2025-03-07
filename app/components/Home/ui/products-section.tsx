import Image from "next/image"
import Link from "next/link"

export default function ProductsSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#F6E7DB]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl text-[#462920] font-serif mb-16">Products</h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Non Bridals */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl text-center font-serif">Non Bridals</h3>
            <Link href="/products/non-bridals" className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src="https://res.cloudinary.com/dklqbx5k0/image/upload/v1741306780/qft3nhk6lrgn6gtyziwr.png"
                  alt="Non Bridal Dress - Black traditional dress with embellishments"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Bridals */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl text-center font-serif">Bridals</h3>
            <Link href="/products/bridals" className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src="https://res.cloudinary.com/dklqbx5k0/image/upload/v1741306785/xygpk7fimeoqlx0xv2si.png"
                  alt="Bridal Dress - Light blue embroidered gown"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

