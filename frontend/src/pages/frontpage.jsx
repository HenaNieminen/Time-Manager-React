import "../styles/main.css"
import { Link } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskWindow from '../components/taskwindow.jsx';
import '../styles/main.css'

const FrontPage = () => {
    return (
        <>
        <ToastContainer />
        <h1>Hello. This is still under construction</h1>
        <div className="navbar">
            <Link className="navbutton" to="/settings">Settings</Link>
            <Link className="navbutton" to="/info">Help/Info</Link>
        </div>
        <TaskWindow />
        </>
    );
};

export default FrontPage;
