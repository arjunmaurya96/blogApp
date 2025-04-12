import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { blogs, loading, error } = useAuth();

  // console.log('Hero component fetch data:', blogs);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5 pt-4 ">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((element) => (
            <div key={element._id} className="col">
              <Link to={`/blog/${element._id}`} className="text-decoration-none">
                <div className="card position-relative overflow-hidden h-100 shadow-sm">
                  {/* Card Image with Zoom Effect */}
                  <div className="card-img-container overflow-hidden bg-dark" style={{ height: '200px', width: '100%' }}>
                    <img
                      src={element.blogimage?.url || ''}
                      className="card-img-top img-fluid object-fit-cover hover-zoom"
                      alt={element.title || 'Blog Image'}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>

                  {/* Title Positioned on Hover */}
                  <h5 className="card-title position-absolute top-50 start-0 translate-end text-white bg-opacity-75 p-2">
                    {element.title}
                  </h5>

                  {/* Card Body */}
                  <div className="card-body d-flex">
                    {/* Admin Photo */}
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
          ))
        ) : (
          <div className="text-center">No blogs available</div>
        )}
      </div>
    </div>
  );
};

export default Hero;
