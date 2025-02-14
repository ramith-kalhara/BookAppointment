import React from 'react';
import PropTypes from 'prop-types'; 

const PageHeader = ({ title, breadcrumbItems, activeBreadcrumb }) => {
  return (
    <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-5">
        <h1 className="display-3 text-white mb-3 animated slideInDown">{title}</h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol className="breadcrumb text-uppercase mb-0">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="breadcrumb-item">
                <a 
                 className="text-white" 
                 href={item.href}
                 style={{ textDecoration: 'none' }}     
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="breadcrumb-item text-primary active" aria-current="page">{activeBreadcrumb}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};


PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
  activeBreadcrumb: PropTypes.string.isRequired,
};

export default PageHeader;
