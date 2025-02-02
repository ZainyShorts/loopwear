"use client"

import { motion } from "framer-motion"
import Navbar from "@/app/components/Navbar/Navbar"
import Footer from "@/app/components/Footer/Footer" 
import { useRouter } from "next/navigation"
import { RocketIcon, LightbulbIcon, UsersIcon, GlobeIcon } from "lucide-react"
import { Brain, PenTool, Search, TrendingUp, BarChart2, MessageSquare, Image, Target, ShoppingCart } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const timelineEvents = [
  {
    year: "2021",
    title: "The AI Revolution Begins",
    description: "Pludo is founded with a vision to empower businesses through AI-powered agents.",
    icon: <LightbulbIcon className="w-6 h-6" />,
  },
  {
    year: "2022",
    title: "Expanding Our Bot Arsenal",
    description: "Launched our first suite of AI agents for SEO, marketing, and logo design.",
    icon: <RocketIcon className="w-6 h-6" />,
  },
  {
    year: "2023",
    title: "Customization Breakthrough",
    description: "Introduced the ability to create fully customized AI agents tailored to specific business needs.",
    icon: <UsersIcon className="w-6 h-6" />,
  },
  {
    year: "2024",
    title: "Global AI Impact",
    description: "Pludo's AI agents are now empowering businesses across various industries worldwide.",
    icon: <GlobeIcon className="w-6 h-6" />,
  },
]

export default function AboutPage() { 
    const router = useRouter();
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      <Navbar />
        <div className="container mx-auto px-4 py-16 sm:py-20">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-purple-400 font-medium mb-4">ABOUT US</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Pludo</h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Revolutionizing Business with AI-Powered Agents
            </p>
          </motion.div>

          {/* Enhanced Company Story Section */}
          <motion.div
            className="mb-20 sm:mb-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 sm:mb-12 text-center">Our Journey</h2>
            <div className="relative">
              {/* Vertical line - hidden on mobile, shown on larger screens */}
              <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-500/30" />

              {/* Mobile timeline line */}
              <div className="sm:hidden absolute left-8 transform -translate-x-1/2 h-full w-1 bg-purple-500/30" />

              {/* Timeline events */}
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col sm:flex-row items-start mb-8 sm:mb-12 ${
                    index % 2 === 1 ? "sm:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-8 sm:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center z-10"
                    style={{ marginTop: "24px" }}
                  >
                    {event.icon}
                  </div>

                  {/* Content */}
                  <div className="ml-16 sm:ml-0 sm:w-1/2 sm:px-8">
                    <div
                      className={`bg-purple-900/30 p-4 sm:p-6 rounded-lg border border-purple-500/30 shadow-lg ${
                        index % 2 === 0 ? "sm:text-right" : ""
                      }`}
                    >
                      <h3 className="text-xl font-bold text-purple-400 mb-2">{event.year}</h3>
                      <h4 className="text-lg font-semibold text-white mb-2">{event.title}</h4>
                      <p className="text-gray-300 text-sm sm:text-base">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
                From our inception to our current global impact, our mission remains steadfast: to empower businesses
                with cutting-edge AI agents that drive growth, efficiency, and innovation. We're not just creating bots;
                we're revolutionizing how businesses operate in the digital age.
              </p>
            </motion.div>
          </motion.div>

          {/* What We Do Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 gap-12 items-center mb-32"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-white mb-6">Our AI Agents</h2>
              <p className="text-gray-300 mb-6">
                At Pludo, we're pioneering the future of business automation with our suite of AI-powered agents. Our
                team of expert AI engineers and data scientists create innovative, customizable solutions that empower
                businesses to work smarter, faster, and more efficiently across various domains.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Search, text: "SEO Optimization Agent" },
                  { icon: TrendingUp, text: "Marketing Strategy Agent" },
                  { icon: ShoppingCart, text: "Sales Automation Agent" },
                  { icon: Image, text: "Logo Design Agent" },
                  { icon: PenTool, text: "Copywriting Agent" },
                  { icon: BarChart2, text: "Business Analytics Agent" },
                  { icon: Target, text: "Lead Generation Agent" },
                  { icon: MessageSquare, text: "Customer Support Agent" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 text-gray-300"
                    whileHover={{ x: 10, color: "#9F7AEA" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="text-purple-400" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-purple-500 rounded-lg opacity-20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                variants={fadeInUp}
                className="relative bg-purple-950/80 p-2 sm:p-8 rounded-lg border border-purple-900/30"
              >
                <h3 className="text-2xl font-bold text-white mb-4 mt-4">Our AI Technology Stack</h3>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {[
                    {
                      title: "Natural Language Processing",
                      items: ["GPT-4", "BERT", "Transformer Models", "Named Entity Recognition"],
                    },
                    {
                      title: "Computer Vision",
                      items: ["Convolutional Neural Networks", "Image Generation", "Object Detection", "GANs"],
                    },
                    { title: "Machine Learning", items: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost"] },
                    { title: "Data Processing", items: ["Apache Spark", "Pandas", "NumPy", "Elasticsearch"] },
                  ].map((stack, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-purple-900/20 p-4 rounded-lg">
                      <h4 className="text-purple-400 font-semibold mb-2">{stack.title}</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        {stack.items.map((item, i) => (
                          <motion.li
                            key={i}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-20 sm:mb-32"
          >
            {[
              { number: "10,000+", label: "Businesses Empowered" },
              { number: "50M+", label: "AI-Powered Tasks Completed" },
              { number: "15+", label: "Customizable AI Agents" },
              { number: "99.9%", label: "Task Accuracy" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(159, 122, 234, 0.5)" }}
                className="text-center p-4 sm:p-6 bg-purple-950/80 rounded-lg border border-purple-900/30 transition-shadow duration-300"
              >
                <motion.div
                  className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm sm:text-base text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center px-4"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Ready to Supercharge Your Business with AI?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              From SEO optimization to sales automation, our AI-powered agents are here to revolutionize your business
              processes. Let's create a customized AI solution tailored to your unique needs.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <motion.button 
                onClick={()=>router.push('/pricing')}
                className="bg-purple-500 hover:bg-purple-600 mx-auto text-white px-8 sm:px-12 py-3 flex items-center gap-2 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Brain className="mr-2" />
                Activate Your AI Agents
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      <Footer />
      </div>
    </>
  )
}

