import "../styles/main.css"
import { Link } from 'react-router-dom';

const FrontPage = () => {
    return (
        <>
        <h1>Hello. This is still under construction</h1>
        <Link to="/settings">Go to settings page</Link>
        <Link to="/info">Go to info page</Link>
        </>
    );
};

export default FrontPage;
