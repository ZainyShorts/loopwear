
export interface TestimonialAuthor {
    name: string;
    location: string;
  }
  
  export interface ReviewStats {
    count: number;
    rating: number;
    status: string;
  }
  
  export interface Testimonial {
    trustpilotRating: string;
    mainTitle: string;
    description: string;
    testimonialQuote: string;
    testimonialAuthor: TestimonialAuthor;
    reviewStats: ReviewStats; 
    backgroundColour:string; 
    image:string;
  }
  
  export const testimonials: Testimonial[] = [
    {
      trustpilotRating: "Rated excellent on Trustpilot",
      mainTitle: "Trusted by thousands of entrepreneurs",
      description:
        "With over 60,000 entrepreneurs from more than 100 countries around the globe, pludo is the world&#39;s leading provider for AI prompts, bots and everything in between.",
      testimonialQuote:
        'Can say my first experiences of using pludo X are very good, in the way you have a selection of assistants to converse with',
      testimonialAuthor: { name: "Steve Nelson", location: "AU" },
      reviewStats: { count: 138, rating: 4.3, status: "Excellent" }, 
      backgroundColour:'bg-[#c8fad7]', 
      image:'https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/66c215f63ef9ccc73367a22d_wwowow-min.png'

    },
    {
      trustpilotRating: "Rated good on Trustpilot",
      mainTitle: "A trusted platform for global entrepreneurs",
      description:
        "pludo brings powerful AI tools to entrepreneurs all over the world, enabling them to build, create, and grow in new ways.",
      testimonialQuote:
        "Using pludo has been a game-changer! The AI assistants are a great help in improving my business efficiency.",
      testimonialAuthor: { name: "Sarah Kim", location: "US" },
      reviewStats: { count: 200, rating: 4.1, status: "Good" }, 
      backgroundColour:'bg-[#f5eec4]', 
      image:'https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/66c215f63ef9ccc73367a22d_wwowow-min.png'
    },
    {
      trustpilotRating: "Rated excellent on Trustpilot",
      mainTitle: "High-priority customer support",
      description:
        "pludo is a leading platform, supporting entrepreneurs in more than 100 countries with AI-powered tools that deliver real results.",
      testimonialQuote:
        "Our Cassie support works 24/7, answering all your pludo questions. Backed by high-priority reliable human support.",
      testimonialAuthor: { name: "James Carter", location: "UK" },
      reviewStats: { count: 92, rating: 4.7, status: "Excellent" }, 
      backgroundColour:'bg-[#acf7fa]', 
      image:'https://cdn.prod.website-files.com/661d4f6d81ac1042b721396c/66c215f63ef9ccc73367a22d_wwowow-min.png'

    },
  ];
  