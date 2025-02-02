import { MessageCircle, FileText, Phone, Mail } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-custom-gradient">
      <div className="container  mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">Support</h1>
        
        {/* Support Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Live Chat Card */}
          <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-all duration-300">
                <MessageCircle className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Live Chat</h3>
              <p className="text-purple-200/70">Chat with our support team</p>
            </CardContent>
          </Card>

          {/* Documentation Card */}
          <Card className="bg-black/20 backdrop-blur-xl border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-all duration-300">
                <FileText className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Documentation</h3>
              <p className="text-pink-200/70">Browse our guides</p>
            </CardContent>
          </Card>

          {/* Phone Support Card */}
          <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-all duration-300">
                <Phone className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Phone Support</h3>
              <p className="text-purple-200/70">Call us directly</p>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="bg-black/20 backdrop-blur-xl border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-all duration-300">
                <Mail className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-pink-200/70">Send us a message</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-6xl mx-auto p-4">
          <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-purple-500/20">
              <AccordionTrigger className="text-white hover:text-purple-400">
                How do I create a new agent?
              </AccordionTrigger>
              <AccordionContent className="text-purple-200/70">
                Go to the Create Agent page and follow the step-by-step wizard to set up your custom agent.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-pink-500/20">
              <AccordionTrigger className="text-white hover:text-pink-400">
                What types of integrations are supported?
              </AccordionTrigger>
              <AccordionContent className="text-pink-200/70">
                We support various social media, messaging, and productivity integrations including Facebook, Instagram, WhatsApp, and more.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-purple-500/20">
              <AccordionTrigger className="text-white hover:text-purple-400">
                How do I upgrade my subscription?
              </AccordionTrigger>
              <AccordionContent className="text-purple-200/70">
                Visit the Payments page and click on &quot;Upgrade Plan&quot; to view available options and make changes to your subscription.
             </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

