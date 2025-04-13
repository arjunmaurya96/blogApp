import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {BACKEND_URL} from '../utils';

const Creators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/users/admins`);
        // console.log('Fetched Creators:', data);
        setCreators(data); // Ensure 'authors' key exists
      } catch (error) {
        console.error('Error fetching creators:', error.message);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-center mb-4">Our Creators</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
        {creators.length > 0 ? (
          creators.map((creator) => (
            <div key={creator._id} className="col d-flex justify-content-center">
              <div className="card shadow-sm border-0 rounded-3 text-center" style={{ width: '18rem' }}>
                {/* Main Card Image */}
                <div className="position-relative">
                  <img
                    src={creator.photo?.url || 'https://via.placeholder.com/300x200'}
                    alt={creator.name}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  {/* Circular Profile Image */}
                  <div
                    className="position-absolute start-50 translate-middle"
                    style={{
                      top: '100%',
                      zIndex: '10',
                    }}
                  >
                    <img
                      src={creator.photo?.url || 'https://via.placeholder.com/100'}
                      alt={creator.name}
                      className="img-fluid rounded-circle"
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        border: '3px solid #fff',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  </div>
                </div>
                {/* Card Body */}
                <div className="card-body mt-5">
                  <h5 className="fw-bold mb-1">{creator.name}</h5>
                  <p className="text-muted mb-1">{creator.email}</p>
                  <p className="text-muted mb-1">{creator.phone}</p>
                  <p className="text-primary fw-bold">Author</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No creators available</div>
        )}
      </div>
    </div>
  );
};

export default Creators;
