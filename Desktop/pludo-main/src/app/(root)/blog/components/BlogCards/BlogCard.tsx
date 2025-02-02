import Image from "next/image"
import Link from "next/link"
import { articles } from "./BlogData"

export default function BlogGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={article.href}
            className="group flex flex-col"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 mb-6">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-600">
                {article.category}
              </p>
              <h2 className="text-2xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">
                {article.description}
              </p>
              <time className="block text-sm text-gray-500">
                {article.date}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

