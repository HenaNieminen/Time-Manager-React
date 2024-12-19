import "../styles/main.css"
import { Link } from 'react-router-dom';

const InfoPage = () => {

    return (
    <>
            <div className="windowColumn" style={{ backgroundColor: 'white', padding: '20px' }}>
            <Link className="navButton" to="/">Go back</Link>
            <h1>About the Application</h1>
            <h2>Author: Henri Nieminen</h2>
            <div className="textContainer">
                <h3>Instructions:</h3>
                <p>The UI is fairly simple and does not need an explanation. Anyone could use it, but
                    here are the instructions anyway:
                </p>
                <p>
                    The UI is split into two parts. In the top, you have saved tasks and filtering options.
                    You can drag them using the handle on top of the task element to re-arrange their order.
                    They also have edit and delete buttons which will manipulate that task and give input fields
                    when activated.
                </p>
                <p>
                    The bottom part is reserved for adding new tags and tasks. When adding a new task, you need to
                    type its name on the input field and optionally, you can click on any tag button under it, to add
                    a tag to that task. When the task gets added with the add task button, it will automatically pop up
                    in the top view. Adding tags works the same way as adding tasks, but it will pop up as a selectable
                    tag in adding or editing tasks. Please note, this is the only place where you can insert new tags in,
                    so you need to use this exclusively to add new tags. The app will automatically refresh itself with new data,
                    so no need to worry about refreshing the page to see the new tag pop up in task editing or adding
                </p>
                <p>
                    When editing or adding stuff, there will be hinted marks showing what to click and should be self-explanatory.
                </p>
            </div>
                <div className="textContainer" style={{ backgroundColor: 'white', padding: '20px' }} >
                <h3>External materials:</h3>
                <p>So far, no licensed materials have been used in this work.
                    Instead of CSS, I have used SCSS, which is an extension of the CSS language
                    and makes it easier to use classes and selectors. React libraries used are toastify,
                    drag and drop, prop-types,
                </p>
                <h3>Comments:</h3>
                <p>
                    Biggest trouble was configuring Drag and Drop, splitting things
                    into cohesive components and slight trouble with database data handling.
                    I would have rather done some functions under the backend rather than have them
                    cramp up the frontend portion. Splitting components also became a bit of a trouble at first
                    and then I had to resort to prop drilling because I already went too far with the implementation.
                    (Which is a no-no. Usecontext and redux would have been in place).

                    Time spent on the project: 64 hours
                </p>
                <h3>AI Tools</h3>
                    <p>AI tools (GitHub Copilot) have mainly been used to solve small problems
                        when a straightforward answer could not be found through web searches (Mainly button functions and getting some parts of logic done.
                        Attribution will be given when used).
                    </p>
            </div>
        </div>
    </>
    );
};

export default InfoPage;
