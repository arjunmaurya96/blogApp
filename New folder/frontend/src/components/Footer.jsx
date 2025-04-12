import React from 'react';


const Footer = () => {
  return (
    <>
      {/* Top Line with Shadow */}
      <div className="line border-top border-dark shadow-lg"></div>

      {/* Footer Content */}
      <div className="container py-5">
        <div className="row text-center text-md-start">
          {/* Column 1 */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Products</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Flutter</a></li>
              <li><a href="#" className="footer-link">React</a></li>
              <li><a href="#" className="footer-link">Android</a></li>
              <li><a href="#" className="footer-link">iOS</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Documentation</a></li>
              <li><a href="#" className="footer-link">Tutorials</a></li>
              <li><a href="#" className="footer-link">Community</a></li>
              <li><a href="#" className="footer-link">Support</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Facebook</a></li>
              <li><a href="#" className="footer-link">Twitter</a></li>
              <li><a href="#" className="footer-link">LinkedIn</a></li>
              <li><a href="#" className="footer-link">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center py-3 border-top">
        <p className="mb-0">© {new Date().getFullYear()} YourCompany. All Rights Reserved.</p>
      </div>
    </>
  );
};

export default Footer;
