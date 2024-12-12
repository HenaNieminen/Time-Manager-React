import { Link } from 'react-router-dom';
import '../styles/main.css'

const SettingsPage = () => {
    return (
        <>
        <div className='windowColumn'>
            <Link className='navButton' to="/">Go back</Link>
        </div>
        </>
    );
};

export default SettingsPage;
