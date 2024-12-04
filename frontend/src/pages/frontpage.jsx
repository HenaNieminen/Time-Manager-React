import "../styles/main.css"
import { Link } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskWindow from '../components/taskwindow.jsx';

const FrontPage = () => {
    return (
        <>
        <ToastContainer />
        <h1>Hello. This is still under construction</h1>
        <Link to="/settings">Go to settings page</Link>
        <Link to="/info">Go to info page</Link>
        <TaskWindow />
        </>
    );
};

export default FrontPage;
