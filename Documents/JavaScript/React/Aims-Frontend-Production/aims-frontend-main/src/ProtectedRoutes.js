import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  
    if( !user ){
        return <Navigate to="/login"  />
    }
 return children

};

export default ProtectedRoute;






// state={{ from: location}} replace


// import { useEffect } from 'react';
// import { Route, Redirect } from 'react-router-dom';  
// import SigninPage from './Pages/signPage.js';

// import { useDispatch, useSelector } from 'react-redux';
// const ProtectedRoute = ({ element : Component, ...rest }) => {
//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!userInfo) {
//       // Redirect to the login page if the user is not authenticated
//       window.location.href = '/login';
//     }
//   }, [userInfo]);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         userInfo ? (
//           <Component {...props} />
//         ) : (
//           <SigninPage />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
