import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/errorpage.jsx';
import FrontPage from './pages/frontpage.jsx';
import InfoPage from './pages/infopage.jsx';
import SettingsPage from './pages/settingspage.jsx';

const router = createBrowserRouter(
    {
        path: '/',
        element: <FrontPage />,
        errorElement: <NotFoundPage />
    },
    {
        path: '/info',
        element: <InfoPage />,
        errorElement: <NotFoundPage />
    },
    {
        path: '/settings',
        element: <SettingsPage />,
        errorElement: <NotFoundPage />
    }
);

export default router;
