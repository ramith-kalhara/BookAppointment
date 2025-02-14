import React from 'react'
import PageHeader from "../component/PageHeader"; 
import pageHeaderData from "../data/pageHeaderData"; 
import Feature from '../component/Feature';
const Feature_Page = () => {
    const pageData = pageHeaderData.find(page => page.page === 'feature');
  return (
    <div>
        <PageHeader 
                title={pageData.title}
                breadcrumbItems={pageData.breadcrumbItems}
                activeBreadcrumb={pageData.activeBreadcrumb}
        />
        <Feature/>

    </div>
  )
}

export default Feature_Page