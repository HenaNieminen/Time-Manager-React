import "../styles/main.css"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTasks, fetchTags, fetchTimes } from '../components/fetchdata.jsx';
import { createNewTask } from '../components/createnewtask.jsx';

const FrontPage = () => {
    let [tasks, setTasks] = useState([]);
    let [tags, setTags] = useState([]);
    let [times, setTimes] = useState([]);

    //Add a new task with separate components and then call fetchData to update
    const addTask = async () => {
        const name = document.getElementById('taskName').value;
        const additional_data = document.getElementById('additionalData').value;
        await createNewTask(name, additional_data);
        await fetchData();
    };
    //Fetch all data from backend with separate components
    const fetchData = async () => {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);

        const fetchedTags = await fetchTags();
        setTags(fetchedTags);

        const fetchedTimes = await fetchTimes();
        setTimes(fetchedTimes);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
        <h1>Hello. This is still under construction</h1>
        <Link to="/settings">Go to settings page</Link>
        <Link to="/info">Go to info page</Link>
            <div className="window-row" >
                <div className='task-window'>
                    <ul>
                        <h3>Tasks</h3>
                        {/*Map out the tasks with ID, name and additional data */}
                        {tasks.map((task, index) => (
                            <li key={index}>
                                <p>ID: <strong>{task.id}</strong></p>
                                <p>Name: <strong>{task.name}</strong></p>
                                <p>Additional Data: <strong>{task.additional_data}</strong></p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        <div>
            <input
                type="text"
                placeholder="Task Name"
                id="taskName"
            />
            <input
                type="text"
                placeholder="Additional Data"
                id="additionalData"
            />
            <div>
            {/*Send the input field to setNewTask if name is at least included */}
                <button onClick={addTask}>Add Task</button>
            </div>
        </div>
        </>
    );
};

export default FrontPage;
