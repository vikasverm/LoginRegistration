import  { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const fetchUserData = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
              return; 
          }

          try {
              const response = await axios.get('http://localhost:3001/me', {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  },
              });
              setUserData(response.data); 
            
              
          } catch (error) {
              console.error("Failed to fetch user data", error);
              localStorage.removeItem('token'); 
          }
      };

      fetchUserData();
  }, []);

  return (
< div className="d-flex flex-column " 
     style={{ 
         backgroundImage: "linear-gradient(#2f4dff, #00d5ff, #0075ff)", 
         height: '100vh' 
     }}>
  
    <div className="w-100 d-flex justify-content-end p-3">
        <Link to='/login' className="btn btn-info" onClick={() => localStorage.removeItem('token')}>Logout</Link>
      </div>
    {userData ? (
        <div className="container">
      
            <table className="table table-light table-bordered mt-3">
                <thead className="table-info">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                       
                        <td>{userData.name}</td>
                        <td>{userData.email}</td>
                        <td>{new Date(userData.dob).toLocaleDateString()}</td>

                    </tr>
                   
                </tbody>
            </table>
        </div>
    ) : (
        <p>Loading user data...</p>
    )}
</div>
  );
}

export default Home;