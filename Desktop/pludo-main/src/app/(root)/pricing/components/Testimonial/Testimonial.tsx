import React from 'react';
import { testimonials, Testimonial } from './data'; 
import Image from 'next/image';

export default function TestimonialSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12  md:py-16 lg:py-20">
        {testimonials.map((testimonial: Testimonial, index: number) => (
            <React.Fragment key={index}>
              <div className="grid md:grid-cols-2 mt-6 bg-white w-full lg:w-[80%] mx-auto gap-8 lg:gap-12 items-start">
            <div className="space-y-6 p-6  ">
              {/* Left Column */}
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-gray-600">
                  {testimonial.trustpilotRating}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                {testimonial.mainTitle}
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                {testimonial.description}
              </p>
            </div>

            <div className="flex flex-col space-y-6 p-6">
              <div className={`${testimonial.backgroundColour} p-6 rounded-xl`}>
                <blockquote className="relative">
                  <p className="text-lg text-gray-800 leading-relaxed">
                  &quot;{testimonial.testimonialQuote}&quot; –{" "}
                    <span className="font-medium">
                      {testimonial.testimonialAuthor.name},{" "}
                      {testimonial.testimonialAuthor.location}
                    </span>
                  </p>
                </blockquote>
              </div>

              <div className="bg-white p-6 rounded-lg flex justify-end">
            <Image
            src={testimonial.image} 
            width={300} 
            height={300}
             alt="Example Image"
            className=""
              />
          </div>

            </div>
      </div>
          </React.Fragment>
        ))}
    </section>
  );
}
