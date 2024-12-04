import { useState, useEffect } from 'react';
import { fetchTasks, fetchTags, fetchTimes } from './fetchdata.jsx';
import { createNewTask } from './createnewtask.jsx'
import { toast } from 'react-toastify';
import "../styles/main.css"

const TaskWindow = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [times, setTimes] = useState([]);
    const [insertedTask, setInsertedTasks] = useState('');
    const [insertedTags, setInsertedTags] = useState('');

    const extractTagNames = (tasks, tags) => {
        for (let task of tasks) {
            const tagIds = task.tags.split(',').map((id) => parseInt(id));
            let tagNames = [];

            for (let id of tagIds) {
                for (let tag of tags) {
                    if (tag.id === id) {
                        tagNames.push(tag.name);
                        break;
                    }
                }
            }

            task.tagNames = tagNames.join(', ');
        }

        return tasks;
    };

    const addTask = async () => {
        await createNewTask(insertedTask, insertedTags);
        await fetchData();
    };

    const syncFailure = (error) => toast(`Error syncing data! Error: ${error}`);

    const fetchData = async () => {
        try {
            const fetchedTasks = await fetchTasks();
            const fetchedTags = await fetchTags();
            const fetchedTimes = await fetchTimes();

            const tasksWithTags = extractTagNames(fetchedTasks, fetchedTags);

            setTasks(tasksWithTags);
            setTags(fetchedTags);
            setTimes(fetchedTimes);
        } catch (error) {
            syncFailure(error);
        }
    }

    useEffect(() => {
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
                                <p>Additional Data: <strong>{task.tagNames}</strong></p>
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
                placeholder="Additional Data"
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