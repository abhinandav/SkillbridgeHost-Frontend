// import React, { lazy, useEffect } from 'react'
// import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// import DashboardLayout from '../pages/adminPartition/Dashboard';
// import ThemeProvider from '../components/admin/elements/theme';
// import { useDispatch, useSelector } from 'react-redux';
// import isAuthAdmin from '../utils/isAuthAdmin';
// import AdminRouter from '../routes/Admin/AdminRouter';
// import { Set_Authentication } from '../redux/authentication/AuthenticationSlice';
// import AdminAuthRouter from '../routes/Admin/AdminAuthRouter';


// function AdminWrapper() {

//   const dispatch = useDispatch()
//   const authentication_user = useSelector(state => state.authentication_user);

//   const token = localStorage.getItem('access');

//   const checkAuthAndFetchUserData = async () => {
//     try {
//       const isAuthenticated = await isAuthAdmin();
//       dispatch(
//         Set_Authentication({
//           name: isAuthenticated.name,
//           isAuthenticated: isAuthenticated.isAuthenticated,
//           isAdmin: isAuthenticated.isAdmin,
//         })
//       );


//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (!authentication_user.name) {
//       checkAuthAndFetchUserData();
//     }
//   }, []);


//   const routes = useRoutes([
//     {
//       element: (
//         <ThemeProvider>
//           <DashboardLayout>
//             <AdminRouter >
//               <Outlet />
//             </AdminRouter>
//           </DashboardLayout>
//         </ThemeProvider>
//       ),
//       children: [
//         { element: <Dashboard />, index: true },
//         { element: <UserManagement />, path: '/user' },
//         { element: <BusStop />, path: '/bus/stop' },
//         { element: <StopList />, path: '/stoplist' },
//         { element: <Approval />, path: "/approval" },
//         { element: <ConnectStop />, path: "/bus/connection" },
//         { element: <ListBusConnection />, path: "/bus/connection/list" },
//         // {
//         //   element: <DirectionsMap
//         //   origin={origin} 
//         //   destination={destination}
//         // />, path: "/map"
//         // },

//       ],
//     },
//     {
//       path: 'login',
//       element: <AdminAuthRouter> <Loginpage /> </AdminAuthRouter>,
//     },
//     {
//       path: '404',
//       element: <NotFoundView />,
//     },
//     {
//       path: '*',
//       element: <Navigate to="/admin/404" replace />,
//     },
//   ]);

//   return routes;
// }

// export default AdminWrapper