import React from 'react';

import PageHeader from "../component/PageHeader"; 
import pageHeaderData from "../data/pageHeaderData"; 
import Service from '../component/Service';
import Appointment from '../component/Appointment';
const Service_Page = () => {
    const pageData = pageHeaderData.find(page => page.page === 'services');

    
    
  return (
    <div>
         <PageHeader 
                title={pageData.title}
                breadcrumbItems={pageData.breadcrumbItems}
                activeBreadcrumb={pageData.activeBreadcrumb}
        />

        <Service/>
    
    </div>
  )
}

export default Service_Page