import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom';


const Devotional = () => {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion")
  return (
    <>
      <div>
        <div className="container mt-5">
          <div>
            <p className='fw-bold'>Devotional</p>
          </div>
          <div className='text-center'>
            <p>the Concept of gods varias widely across diffrent culture,</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            {devotionalBlogs && devotionalBlogs.length > 0 ? (
              devotionalBlogs.slice(0, 4).map((element) => (
                <div key={element._id} className="col">
                  <Link to={`/blog/${element._id}`} className="text-decoration-none">
                    <div className="card position-relative overflow-hidden h-100 shadow-sm">
                      {/* Card Image with Zoom Effect */}
                      <div className="card-img-container overflow-hidden bg-dark" style={{ height: '180px', width: '100%' }}>
                        <img
                          src={element.blogimage?.url || ''}
                          className="card-img-top img-fluid object-fit-cover hover-zoom"
                          alt={element.title || 'Blog Image'}
                          style={{ height: '100%', width: '100%' }}
                        />
                      </div>

                      {/* Title Positioned on Hover */}
                      <h5 className="card-title mt-4 d-flex flex-column position-absolute top-50 start-0 translate-end text-white bg-opacity-75 p-2">
                        {element.title}
                        <span>{element.category}</span>
                      </h5>


                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center">No blogs available</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Devotional