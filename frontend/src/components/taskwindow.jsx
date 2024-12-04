import { useState, useEffect } from 'react';
import backFunc from './backendfunc.jsx';
import { toast } from 'react-toastify';
import { extractTagNames } from './extractTagNames';
import { createNewTask } from './createnewtask.jsx';
import "../styles/main.css";

const TaskWindow = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [times, setTimes] = useState([]);
    const [insertedTask, setInsertedTasks] = useState('');
    const [insertedTags, setInsertedTags] = useState('');
    //Nasty duplication. Will need a single function to put it all togheter
    const addTask = async () => {
        await createNewTask(insertedTask, insertedTags);
        await fetchData();
    };

    const deleteTask = async (id) => {
        await backFunc.removeTask(id);
        await fetchData();
    };

    const adjustTask = async (id, task, tags) => {
        await backFunc.editTask(id, task, tags)
        await fetchData();
    }

    const syncFailure = (error) => toast.error(`Error syncing data! Error: ${error.message}}`);

    const fetchData = async () => {
        try {
            const fetchedTasks = await backFunc.fetchTasks();
            const fetchedTags = await backFunc.fetchTags();
            const fetchedTimes = await backFunc.fetchTimes();
            const tasksWithTags = extractTagNames(fetchedTasks, fetchedTags);

            setTasks(tasksWithTags);
            setTags(fetchedTags);
            setTimes(fetchedTimes);
        } catch (error) {
            syncFailure(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="window-row">
                <div className="task-window">
                    <ul>
                        <h3>Tasks</h3>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                <p>Name: <strong>{task.name}</strong></p>
                                <p>Tags: <strong>{task.tagNames}</strong></p>
                                {/* Delete Button */}
                                <button onClick={() => deleteTask(task.id)}>Delete Task</button>
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
                    <button onClick={addTask}>Add Task</button>
                </div>
            </div>
        </>
    );
};

export default TaskWindow;