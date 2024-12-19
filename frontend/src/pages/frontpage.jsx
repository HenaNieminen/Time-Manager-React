import "../styles/main.css"
import { Link } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskWindow from '../components/taskwindow.jsx';
import '../styles/main.css'

const FrontPage = () => {
    return (
        <>
        {/*Toastcontainer used here to display toast alerts */}
        <ToastContainer />
        <div className="navBar">
            <Link className="navButton" to="/settings">Settings</Link>
            <Link className="navButton" to="/info">Help/Info</Link>
                {/*Navigation to other sections*/}
        </div>
        <TaskWindow />
        </>
    );
};

export default FrontPage;
