'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Mail, Phone, MapPin } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function ContactPageForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast({
      title: "Message sent!",
      description: "We&#39;ll get back to you as soon as possible.",
    })
    
    setIsSubmitting(false)
    ;(event.target as HTMLFormElement).reset()
  }

  return (
    <div className="min-h-screen bg-custom-gradient flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full mt-24 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Contact Pludo Support
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Have questions? We&#39;d love to hear from you. Send us a message and we&#39;ll respond as soon as possible.
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-white/10 border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-indigo-100">First name</Label>
                  <Input 
                    id="firstName"
                    placeholder="Enter your first name"
                    required
                    className="bg-white/20 border-0 placeholder-indigo-200 text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-indigo-100">Last name</Label>
                  <Input 
                    id="lastName"
                    placeholder="Enter your last name"
                    required
                    className="bg-white/20 border-0 placeholder-indigo-200 text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-indigo-100">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-white/20 border-0 placeholder-indigo-200 text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-indigo-100">Subject</Label>
                <Select required>
                  <SelectTrigger className="bg-white/20 border-0 text-white focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent className='bg-white/40 font-semibold text-lg  backdrop-blur-md'>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-indigo-100">Message</Label>
                <Textarea 
                  id="message"
                  placeholder="Your message..."
                  className="min-h-[150px] bg-white/20 border-0 placeholder-indigo-200 text-white focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Contact Info */}
        <div className="mt-12 grid sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform transition duration-500 hover:scale-105">
            <Mail className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
            <h3 className="font-semibold text-xl text-white mb-2">Email</h3>
            <p className="text-indigo-200">support@pludo.com</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform transition duration-500 hover:scale-105">
            <Phone className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
            <h3 className="font-semibold text-xl text-white mb-2">Phone</h3>
            <p className="text-indigo-200">+1 (555) 123-4567</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform transition duration-500 hover:scale-105">
            <MapPin className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
            <h3 className="font-semibold text-xl text-white mb-2">Office</h3>
            <p className="text-indigo-200">123 Pludo Street<br />San Francisco, CA 94105</p>
          </div>
        </div>
      </div>
    </div>
  )
}

