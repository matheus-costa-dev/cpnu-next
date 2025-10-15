import ContactSection from '@/components/ContactSection'
import FaqSection from '@/components/FaqSection'
import React from 'react'

function page() {
  return (
    <div className='py-10 container mx-auto'>
        <FaqSection />
        <ContactSection />
    </div>
  )
}

export default page