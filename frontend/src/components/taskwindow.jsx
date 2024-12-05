import { useState, useEffect } from 'react';
import backFunc from './backendfunc.jsx';
import { toast } from 'react-toastify';
import { extractTagNames } from './extractTagNames';
import { createNewTask, createNewTag } from './createnew.jsx';
import "../styles/main.css";

const TaskWindow = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [times, setTimes] = useState([]);

    const [insertedTask, setInsertedTasks] = useState('');
    const [insertedTags, setInsertedTags] = useState('');

    const [insertedTag, setInsertedTag] = useState('');

    const [editMode, setEditMode] = useState(null);
    const [editedTask, setEditedTask] = useState('');
    const [editedTags, setEditedTags] = useState('');

    const addTask = async () => {
        await createNewTask(insertedTask, insertedTags);
        await fetchData();
    };

    const addTag = async () => {
        await createNewTag(insertedTag);
        await fetchData();
    }

    const deleteTask = async (id) => {
        await backFunc.removeTask(id);
        await fetchData();
    };

    const adjustTask = async (id, updatedTaskName, updatedTags) => {
        await backFunc.editTask(id, { name: updatedTaskName }, updatedTags);
        await fetchData();
        setEditMode(null);
    };

    const syncFailure = (error) => toast.error(`Error syncing data! Error: ${error.message}`);

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
                                {editMode === task.id ? (
                                    <div>
                                        <input
                                            type="text"
                                            defaultValue={task.name}
                                            onChange={(e) => setEditedTask(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            defaultValue={task.tags}
                                            onChange={(e) => setEditedTags(e.target.value)}
                                        />
                                        <button onClick={() => adjustTask(task.id, editedTask, editedTags)}>
                                            Save
                                        </button>
                                        <button onClick={() => setEditMode(null)}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <p>Name: <strong>{task.name}</strong></p>
                                        <p>Tags: <strong>{task.tagNames}</strong></p>
                                        <button onClick={() => setEditMode(task.id)}>Edit</button>
                                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                                    </div>
                                )}
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