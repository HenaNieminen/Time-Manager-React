import { Link } from 'react-router-dom';
import errorImage from '../images/404.png';
import "../styles/main.css"

export default function NotFoundPage() {
    //Returns an error element for the router
    return (
        <div>
            <h1>404: Not found</h1>
            <img src={errorImage} alt="GTA 3 easter egg on Staunton Island. Sign that says
            you werent supposed to be able to get here you know" />
            <div>
                <Link className="link-item" to="/">Go back to the main page</Link>
            </div>
        </div>
    );
}