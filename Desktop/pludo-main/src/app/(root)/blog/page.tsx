import React from 'react'
import AnnouncementBlog from './components/FrontBlog/FrontBlog'
import BlogGrid from './components/BlogCards/BlogCard'
import Navbar from '@/app/components/Navbar/Navbar'
import Footer from '@/app/components/Footer/Footer'

const page = () => {
  return (
    <>
    <Navbar/>
    <div className='mt-24'>
        <AnnouncementBlog/>
        <BlogGrid/>
    </div>
    <Footer/>
    </>
  )
}

export default page