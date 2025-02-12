import React from 'react'
import PageHeader from "../component/PageHeader"; 
import pageHeaderData from "../data/pageHeaderData"; 
import Contact from '../component/Contact';
function Contact_Page() {
    const pageData = pageHeaderData.find(page => page.page === 'contact');
  return (
    <div>
        <PageHeader 
                title={pageData.title}
                breadcrumbItems={pageData.breadcrumbItems}
                activeBreadcrumb={pageData.activeBreadcrumb}
        />

        <Contact/>

    </div>
  )
}

export default Contact_Page