import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/errorpage.jsx';
import FrontPage from './pages/frontpage.jsx';
import InfoPage from './pages/infopage.jsx';
import SettingsPage from './pages/settingspage.jsx';

const router = createBrowserRouter([
    //Create a router for all views
    {
        path: '/',
        element: <FrontPage />,
        //If an error happens or user types in a wrong address, this will display
        errorElement: <NotFoundPage />,
    },
    {
        path: '/info',
        element: <InfoPage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/settings',
        element: <SettingsPage />,
        errorElement: <NotFoundPage />,
    },
]);

export default router;
