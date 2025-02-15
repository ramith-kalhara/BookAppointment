import React from 'react'
import Team from '../component/Team'
import PageHeader from "../component/PageHeader"; 
import pageHeaderData from "../data/pageHeaderData"; 
const Doctors_Page = () => {
    const pageData = pageHeaderData.find(page => page.page === 'doctor');
  return (
    <div>
        <PageHeader 
                title={pageData.title}
                breadcrumbItems={pageData.breadcrumbItems}
                activeBreadcrumb={pageData.activeBreadcrumb}
        />
        <Team/>

    </div>
  )
}

export default Doctors_Page