import "../styles/main.css"
import { Link } from 'react-router-dom';

const InfoPage = () => {

    return (
    <>
        <div className="windowColumn">
            <h1>About the Application</h1>
            <h2>Author: Henri Nieminen</h2>
            <div className="textContainer">
                <h3>Instructions:</h3>
            </div>
            <div className="textContainer">
                <h3>Materials Used</h3>
                <p>So far, no licensed materials have been used in this work.
                    Instead of CSS, I have used SASS, which is an extension of the CSS language
                    and makes it easier to use classes and selectors. Other React libraries such as
                    toastify, router, etc. have also been used. The plan is also to localize (i18n).
                </p>
                <p>AI tools (GitHub Copilot) have mainly been used to solve small problems
                    when a straightforward answer could not be found through web searches. (Mainly button functions and getting some parts of logic done.
                    Attribution will be given when used)
                    Casmoden Solutions on youtube is also a good source for learning stuff.
                    <a href="https://www.youtube.com/@cosdensolutions" target="_blank" rel="noopener noreferrer">https://www.youtube.com/@cosdensolutions</a>
                    This mostly applies to useContext. I went too far with prop drilling the task function
                </p>
            </div>
                <Link className="navButton" to="/">Go back</Link>
        </div>
    </>
    );
};

export default InfoPage;
