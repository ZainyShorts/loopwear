"use client"

import { motion } from "framer-motion"
import Navbar from "@/app/components/Navbar/Navbar"
import Footer from "@/app/components/Footer/Footer"
import { Shield, Lock, Eye, FileText } from "lucide-react"
import Link from "next/link"

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

const privacyPolicySections = [
  {
    title: "Information Collection",
    description:
      "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.",
    icon: <Eye className="w-6 h-6" />,
  },
  {
    title: "Use of Information",
    description:
      "We use the information we collect to provide, maintain, and improve our services, as well as to develop new features and protect our users.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Information Sharing",
    description:
      "We do not share your personal information with third parties except as described in this privacy policy or with your consent.",
    icon: <Lock className="w-6 h-6" />,
  },
  {
    title: "Data Security",
    description:
      "We use reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.",
    icon: <Shield className="w-6 h-6" />,
  },
]

export default function PrivacyPolicyPage() {
  return (
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
          <div className="text-purple-400 font-medium mb-4">PRIVACY POLICY</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Protecting Your Privacy</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            At Pludo, we are committed to safeguarding your personal information and ensuring transparency in our data
            practices.
          </p>
        </motion.div>

        {/* Privacy Policy Sections */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          {privacyPolicySections.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-purple-950/80 p-6 rounded-lg border border-purple-900/30"
            >
              <div className="flex items-center mb-4">
                <div className="bg-purple-500 p-2 rounded-full mr-4">{section.icon}</div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-300">{section.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Full Privacy Policy */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="bg-purple-950/80 p-8 rounded-lg border border-purple-900/30 mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-6">
            Full Privacy Policy
          </motion.h2>
          <motion.div variants={fadeInUp} className="text-gray-300 space-y-4">
            <p>
              This Privacy Policy describes how Pludo ("we", "our", or "us") collects, uses, and shares your personal
              information when you use our website and services.
            </p>
            <h3 className="text-xl font-semibold text-white mt-6 mb-2">1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us, such as when you create an account, use our services,
              or contact us for support. This may include your name, email address, and any other information you choose
              to provide.
            </p>
            <h3 className="text-xl font-semibold text-white mt-6 mb-2">2. How We Use Your Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our services, develop new features,
              and protect our users. We may also use the information for research and analytics purposes.
            </p>
            <h3 className="text-xl font-semibold text-white mt-6 mb-2">3. Information Sharing and Disclosure</h3>
            <p>
              We do not share your personal information with third parties except as described in this privacy policy or
              with your consent. We may share information with service providers who perform services on our behalf, or
              if required by law.
            </p>
            <h3 className="text-xl font-semibold text-white mt-6 mb-2">4. Data Security</h3>
            <p>
              We use reasonable measures to help protect your personal information from loss, theft, misuse,
              unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable
              and we cannot guarantee the security of our systems 100%.
            </p>
            <h3 className="text-xl font-semibold text-white mt-6 mb-2">5. Your Rights and Choices</h3>
            <p>
              You may have certain rights regarding your personal information, including the right to access, correct,
              or delete the information we have about you. Contact us to exercise these rights.
            </p>
            <h3 className="text-xl font-semibold text-white mt-6 mb-2">6. Changes to This Policy</h3>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new
              privacy policy on this page.
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="text-center px-4"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Questions About Our Privacy Policy?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <motion.button
              className="bg-purple-500 hover:bg-purple-600 mx-auto text-white px-8 sm:px-12 py-3 flex items-center gap-2 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <Link href={'/contact'}>
              Contact Us
            </Link>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

