import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Trending = () => {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Trending Blogs</h2>
      {blogs && blogs.length > 0 ? (
        <Carousel responsive={responsive} infinite autoPlay>
          {blogs.map((element) => (
            <div key={element._id} className="p-2">
              <Link to={`/`} className="text-decoration-none">
                <div className="card position-relative overflow-hidden shadow-sm">
                  {/* Image Section */}
                  <div className="overflow-hidden bg-light p-2" style={{ height: '200px' }}>
                    <img
                      src={element.blogimage?.url || ''}
                      className="card-img-top img-fluid object-fit-cover"
                      alt={element.title || 'Blog Image'}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>

                  <h5 className="card-title position-absolute top-50 start-0 w-100 text-white bg-dark bg-opacity-50 text-center p-2">
                    {element.title}
                  </h5>

                  <div className="card-body d-flex align-items-center">
                    <img
                      src={element.adminphoto}
                      className="border rounded-circle"
                      style={{ height: '45px', width: '45px' }}
                      alt="Admin"
                    />
                    <div className="ms-2 d-flex flex-column">
                      <span className="fw-bold">{element.adminname}</span>
                      <span className="small text-muted">New</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="text-center">No blogs available</div>
      )}
    </div>
  );
};

export default Trending;
