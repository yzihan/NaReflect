import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import { Navigate } from 'react-router-dom';

const routes = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/login',
        element: <Login />
    },
  ];
  
  export default routes;