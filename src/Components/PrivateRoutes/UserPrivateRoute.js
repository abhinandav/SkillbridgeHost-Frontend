import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthUser from '../../Utils/isAuthUser';
import loadingAnimation from '../../Images/loading animation2.json'
import Lottie from 'react-lottie';



function UserPrivateRoute({ children }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState({
    is_authenticated: false,
    is_admin: false,
    is_tecaher:false
  });


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }; 


  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthUser();
      setIsAuthenticated({
        'is_authenticated' : authInfo.isAuthenticated,
        'is_admin' : authInfo.isAdmin,
        'is_teacher' : authInfo.isTeacher,
        
      });
        setLoading(false);
    };

    fetchData();
  }, []);





  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <Lottie options={defaultOptions} height={300} width={400} className="p-3 m-2" />
      </div>
    );
  }


  if (!isAuthenticated.is_authenticated) {
    return <Navigate to="/login" />;
  }

  
  if ((isAuthenticated.is_admin || isAuthenticated.is_staff)) {
    return <Navigate to="/login" />;
  }

  return children;
}


export default UserPrivateRoute;