import React from 'react'
import About from '../component/About'
import Feature from '../component/Feature'
import Team from '../component/Team'
import PageHeader from "../component/PageHeader"; 
import pageHeaderData from "../data/pageHeaderData"; 
const About_Page = () => {
    const pageData = pageHeaderData.find(page => page.page === 'about');
  return (
    <div>
        <div>
      
      
      <PageHeader 
        title={pageData.title}
        breadcrumbItems={pageData.breadcrumbItems}
        activeBreadcrumb={pageData.activeBreadcrumb}
      />

      <About/>

      <Feature/>
      <Team limit={4}/>
    
    </div>
    </div>
  )
}

export default About_Page