import { useState, useEffect } from 'react';
import backFunc from './backendfunc.jsx';
import { toast } from 'react-toastify';
import { extractTagNames } from './extractTagNames';
import { ShowInsertedTags } from './showinsertedtags.jsx';
import { createNewTask, createNewTag, checkDuplicates } from './createnew.jsx';
import "../styles/main.css";

const TaskWindow = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    //const [times, setTimes] = useState([]);

    const [insertedTask, setInsertedTasks] = useState('');
    const [insertedTaskTag, setInsertedTaskTag] = useState([]);

    const [addedTag, setAddedTag] = useState('');

    const [editMode, setEditMode] = useState(null);
    const [editedTask, setEditedTask] = useState('');
    const [editedTags, setEditedTags] = useState([]);

    const addTask = async () => {
        const isDuplicate = checkDuplicates(tasks, insertedTask);
        if (isDuplicate) {
            toast.error('Task already exists!');
            return;
        }
        const tagIds = insertedTaskTag.map((tag) => tag.id);
        await createNewTask(insertedTask, tagIds);
        await fetchData();
    };

    const addTag = async () => {
        const isDuplicate = checkDuplicates(tags, addedTag);
        if (isDuplicate) {
            toast.error('Tag already exists!');
            return;
        }
        await createNewTag(addedTag);
        await fetchData();
    };

    const deleteTask = async (id) => {
        await backFunc.removeTask(id);
        await fetchData();
    };

    const deleteTag = async (id) => {
        await backFunc.removeTag(id);
        await fetchData();
    };

    const adjustTask = async (id, updatedTaskName, updatedTags) => {
        const originalTask = tasks.find(task => task.id === id);
        if (originalTask.name !== updatedTaskName) {
            const isDuplicate = await checkDuplicates(tasks, updatedTaskName);
            if (isDuplicate) {
                toast.error('Task already exists!');
                return;
            }
        }
        await backFunc.editTask(id, { name: updatedTaskName }, updatedTags);
        await fetchData();
        setEditMode(null);
    };

    const syncFailure = (error) => toast.error(`Error syncing data! Error: ${error.message}`);

    const fetchData = async () => {
        try {
            const fetchedTasks = await backFunc.fetchTasks();
            const fetchedTags = await backFunc.fetchTags();
            //const fetchedTimes = await backFunc.fetchTimes();
            const tasksWithTags = extractTagNames(fetchedTasks, fetchedTags);

            setTasks(tasksWithTags);
            setTags(fetchedTags);
            //setTimes(fetchedTimes);
        } catch (error) {
            syncFailure(error);
        }
    };

    const tagButtonClickForAdding = (tag) => {
        setInsertedTaskTag((prevTags) => {
            if (!prevTags.includes(tag)) {
                return [...prevTags, tag];
            }
            return prevTags;
        });
    };

    const tagButtonClickForEditing = (tag) => {
        setEditedTags((prevTags) => {
            if (!prevTags.includes(tag)) {
                return [...prevTags, tag];
            }
            return prevTags;
        });
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
                                        {/*This needs to take all the previous tags taken into attention*/}
                                        <ShowInsertedTags state={editedTags} setState={setEditedTags} />
                                        <div>
                                            {tags.map((tag) => (
                                                <button
                                                    key={tag.id}
                                                    onClick={() =>
                                                        tagButtonClickForEditing(tag.name, setEditedTags)
                                                    }
                                                >
                                                    {tag.name}
                                                </button>
                                            ))}
                                        </div>
                                        {/*Doesnt work yet */}
                                        <button onClick={() => adjustTask(task.id, editedTask, editedTags)}>
                                            Save
                                        </button>
                                        <button onClick={() => setEditMode(null)}>Cancel</button>
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
                    value={insertedTask}
                    onChange={(e) => setInsertedTasks(e.target.value)}
                />
                <div>
                    <ShowInsertedTags state={insertedTaskTag} setState={setInsertedTaskTag} />
                </div>
                    {tags.map((tag) => (
                        <button
                            key={tag.id}
                            onClick={() => tagButtonClickForAdding(tag)}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            <div>
                <button onClick={() => { addTask(); setInsertedTaskTag([]); setInsertedTasks(''); }}>Add Task</button>
            </div>
            <input
                type="text"
                placeholder="Tag name"
                id="tagName"
                value={addedTag}
                onChange={(e) => setAddedTag(e.target.value)}
            />
            <button onClick={() => { addTag(); setAddedTag('') }}>Add Tag </button>
        </>
    );
};

export default TaskWindow;
