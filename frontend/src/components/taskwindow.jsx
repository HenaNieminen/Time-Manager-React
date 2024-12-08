import { useState, useEffect, useCallback } from 'react';
import backFunc from './backendfunc.jsx';
import { toast } from 'react-toastify';
import { extractSingularTags, extractTagNames } from './extractTagNames';
import { ShowInsertedTags } from './showinsertedtags.jsx';
import { createNewTask, createNewTag, checkDuplicates } from './createnew.jsx';
import "../styles/main.css";

const TaskWindow = () => {
    //Aaand here is my useState hell
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    //const [times, setTimes] = useState([]);

    const [insertedTask, setInsertedTasks] = useState('');
    const [insertedTaskTag, setInsertedTaskTag] = useState([]);

    const [addedTag, setAddedTag] = useState('');

    const [editMode, setEditMode] = useState(null);
    const [editedTask, setEditedTask] = useState('');
    const [editedTags, setEditedTags] = useState([]);

    //This is something ESLINT and Co-pilot were constantly complaining about
    const fetchData = useCallback(async () => {
        /*This uses the useCallback library from React and is wrapped into the
        useEffect or componentdidmount*/
        try {
            /*Honestly I have no clue whatsoever how can this change or improve my code
            so I am gonna leave it and hope it doesnt cause any headaches*/
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
        //I doubt this is even a good implementation of the darned thing
    }, []);

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

    const adjustTask = async (id) => {
        const originalTask = tasks.find(task => task.id === id);
        if (originalTask.name !== editedTask) {
            const isDuplicate = await checkDuplicates(tasks, editedTask);
            if (isDuplicate) {
                toast.error('Task already exists!');
                return;
            }
        }
        const tagId = editedTags.map((tag) => tag.id);
        await backFunc.editTask(id, { name: editedTask, tags: tagId });
        await fetchData();
        setEditMode(null);
    };

    const syncFailure = (error) => toast.error(`Error syncing data! Error: ${error.message}`);

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
    }, [fetchData]);

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
                                                        tagButtonClickForEditing(tag)
                                                    }
                                                >
                                                    {tag.name}
                                                </button>
                                            ))}
                                        </div>
                                        {/*Doesnt work yet */}
                                        <button onClick={() => adjustTask(task.id)}>
                                            Save
                                        </button>
                                        <button onClick={() => setEditMode(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p>Name: <strong>{task.name}</strong></p>
                                        <p>Tags: <strong>{task.tagNames}</strong></p>
                                        {/*This is most likely where the problem lies*/}
                                        <button onClick={() =>
                                            { setEditMode(task.id);
                                            setEditedTask(task.name);
                                            setEditedTags(extractSingularTags(task.tags, tags))
                                            }}>Edit</button>
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
                <button onClick={() =>
                { setInsertedTaskTag([]);
                setInsertedTasks('');
                addTask();
                }}>Add Task</button>
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
