import Login from '../src/pages/Login';
import Blocks from '../src/pages/blocks'
import Test from '../src/pages/test'
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
    {
        path: '/blocks',
        element: <Blocks />
    },
    {
        path: '/test',
        element: <Test />
    },
];

  export default routes;
