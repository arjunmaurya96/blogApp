import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Creator = () => {
  const [admin, setAdmin] = useState([]);
  
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/users/admins');
        // console.log('User data:', data);
        setAdmin(data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container mt-5 my-5">
      <h2 className="text-center mb-4">Popular Creators </h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <div key={element._id} className="col text-center">
              <Link to={`/`} className="text-decoration-none">
                <div className="card border-1 shadow-sm p-2 rounded-circle mx-auto" style={{ width: '150px', height: '150px' }}>
                  {/* Admin Image */}
                  <div className="overflow-hidden rounded-circle bg-light mx-auto" style={{ width: '100%', height: '100%' }}>
                    <img
                      src={element.photo?.url || ''}
                      className="img-fluid object-fit-cover rounded-circle"
                      alt={element.name || 'Admin Image'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
               
                <div className="mt-2">
                  <p className="fw-bold mb-0">{element.name}</p>
                  <p className="text-muted small">{element.role}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center col-12">
            <p>No admins available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Creator;
