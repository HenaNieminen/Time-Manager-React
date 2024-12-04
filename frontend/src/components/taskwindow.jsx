import { useState, useEffect } from 'react';
import backFunc from './backendfunc.jsx';
import { toast } from 'react-toastify';
import { extractTagNames } from './extractTagNames';
import "../styles/main.css"

/* The basic idea inside the task window is to have some functionality here
but then transfer the brunt of the logic into other files and then just call them from here.
The functions here then can easily refresh the data with the fetchData function when they are
done and no need for complicated passes and stuff*/
const TaskWindow = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [times, setTimes] = useState([]);
    const [insertedTask, setInsertedTasks] = useState('');
    const [insertedTags, setInsertedTags] = useState('');



    const addTask = async () => {
        //function to add tasks utilizing other components
        await backFunc.createNewTask(insertedTask, insertedTags);
        await fetchData();
        //Error handling has also been ousted to them so this is pretty simple
    };

    const deleteTask = async () => {
    }

    const editTaskName = async () => {

    }

    const editTaskTags = async () => {

    }

    //If the backend fails put out this toast notification
    const syncFailure = (error) => toast.error(`Error syncing data! Error: ${error.message}}`);

    const fetchData = async () => {
        try {
            const fetchedTasks = await backFunc.fetchTasks();
            const fetchedTags = await backFunc.fetchTags();
            const fetchedTimes = await backFunc.fetchTimes();
            //Fetch everything and then insert tagnames into tasks
            const tasksWithTags = extractTagNames(fetchedTasks, fetchedTags);

            setTasks(tasksWithTags);
            setTags(fetchedTags);
            setTimes(fetchedTimes);
        } catch (error) {
            //Throw the toast with the error
            syncFailure(error);
        }
    }

    useEffect(() => {
        //Fetch all data when component mounts
        fetchData();
    }, []);

    return(
        <>
        <div className="window-row" >
                <div className='task-window'>
                    <ul>
                        <h3>Tasks</h3>
                        {/*Map out the tasks with ID, name and additional data */}
                        {tasks.map((task, index) => (
                            <li key={index}>
                                <p>ID: <strong>{task.id}</strong></p>
                                <p>Name: <strong>{task.name}</strong></p>
                                <p>Tags: <strong>{task.tagNames}</strong></p>
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
                onChange={(e) => setInsertedTasks(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tags"
                id="additionalData"
                onChange={(e) => setInsertedTags(e.target.value)}
            />
            <div>
            {/*Send the input field to setNewTask if name is at least included */}
                <button onClick={addTask}>Add Task</button>
            </div>
        </div>
        </>
    )
}

export default TaskWindow;
